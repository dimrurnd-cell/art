# Онлайн-режим: установка на сервер

Онлайн-режим — посетители видят, кто сейчас на выставке и где, и
разговаривают тет-а-тет: один приглашает, второй принимает приглашение.
Переписка хранится на сервере; модератор смотрит её на закрытой странице,
удаляет сообщения и блокирует нарушителей.

Работает так же, как куратор Татьяна: маленькая служба на Python на сервере
со статикой каталога, nginx передаёт ей адрес
`https://donexpocentre.ru/api/artcatalog/live/`, страница на Tilda
подключается к нему. Сторонних библиотек не нужно — хватает
`/usr/bin/python3.6`, который уже стоит для куратора.

Все команды — в PuTTY (в консоли WinSCP `sudo` не работает).

## Шаг 1. Файлы службы

```bash
sudo mkdir -p /opt/artcatalog-live
cd /opt/artcatalog-live
B=https://raw.githubusercontent.com/dimrurnd-cell/art/claude/repository-overview-h8lcj2/catalog/server/live
sudo curl -fsSLO $B/live_server.py
sudo curl -fsSLO $B/live.env.example
sudo curl -fsSLO $B/artcatalog-live.service
sudo curl -fsSLO $B/nginx-live.conf
sudo curl -fsSLO $B/live-backup.sh
ls -l
```

Должно быть пять файлов. Если GitHub с сервера не открывается — залейте
файлы из папки `catalog/server/live/` через WinSCP в `/opt/artcatalog-live/`.

## Шаг 2. Папка для переписки

База с перепиской — один файл. Папку создаём от имени пользователя службы
(`develop`, как у куратора), иначе служба не сможет в неё писать:

```bash
sudo -u develop mkdir -p /home/develop/.local/share/artcatalog-live
sudo chmod 700 /home/develop/.local/share/artcatalog-live
```

Переписка и адреса — только владельцу службы: сама служба ставит базе права
600, а в unit-файле `UMask=0077`.

## Шаг 3. Настройки и пароль модератора

```bash
sudo cp /opt/artcatalog-live/live.env.example /etc/artcatalog-live.env
sudo chmod 600 /etc/artcatalog-live.env
sudo nano /etc/artcatalog-live.env
```

Впишите пароль модератора после `LIVE_ADMIN_PASSWORD=` — не короче
10 символов, русские буквы можно. Этот пароль только ваш: никому его не
пересылайте. Остальное оставьте как есть. Сохранить — `Ctrl+O`, `Enter`,
выйти — `Ctrl+X`.

## Шаг 4. Проверка

```bash
sudo /usr/bin/python3.6 /opt/artcatalog-live/live_server.py --check --env /etc/artcatalog-live.env
```

Ожидаемо:

```
  ✓ папка есть, владелец: develop (должен совпадать с User= в службе)
  ✓ WebSocket: рукопожатие считается верно
  ✓ пароль модератора задан (… символов)
готово
```

## Шаг 5. Служба systemd — чтобы онлайн-режим работал всегда

```bash
sudo cp /opt/artcatalog-live/artcatalog-live.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now artcatalog-live
sudo systemctl status artcatalog-live --no-pager
curl -s http://127.0.0.1:8767/ping
```

В статусе — `active (running)`, ответ на `ping` — `{"ok": true, "online": 0}`.

## Шаг 6. nginx

Откройте тот же файл, куда вставляли адрес куратора:

```bash
sudo nano /etc/nginx/conf.d/ssl.conf
```

Рядом с блоком `location /api/artcatalog/curator/ { … }` (внутри того же
`server { … }`) вставьте содержимое файла `/opt/artcatalog-live/nginx-live.conf`
— его можно посмотреть командой `cat /opt/artcatalog-live/nginx-live.conf`.
Главное в нём — строки `Upgrade` и `Connection "upgrade"`: без них
онлайн-режим не подключится. Затем:

Второй блок в файле — `location /api/artcatalog/live/admin` — закрывает
страницу модератора вторым паролем (см. ниже). Вставьте оба блока, затем
создайте файл второго пароля.

### Второй пароль на странице модератора

Браузер спросит логин и пароль ещё до пароля модератора: страницу не
перебрать с чужих адресов. Пароль вводится с клавиатуры дважды (на экране
не виден) и не остаётся в истории команд:

```bash
printf 'moder:%s\n' "$(openssl passwd -apr1)" | sudo tee /etc/nginx/artcatalog-admin.htpasswd >/dev/null
grep -m1 '^user' /etc/nginx/nginx.conf
```

Вторая команда показывает, от какого пользователя работает nginx (обычно
`nginx`). Ему нужно право читать файл паролей:

```bash
sudo chown root:nginx /etc/nginx/artcatalog-admin.htpasswd
sudo chmod 640 /etc/nginx/artcatalog-admin.htpasswd
```

(вместо `nginx` — имя из строки `user`, если там другое). Логин — `moder`,
пароль — новый, не такой, как пароль модератора. Сменить его — та же первая
команда.

```bash
sudo nginx -t && sudo systemctl reload nginx
curl -s https://donexpocentre.ru/api/artcatalog/live/ping
curl -s -o /dev/null -w '%{http_code}\n' https://donexpocentre.ru/api/artcatalog/live/admin
```

`ping` отвечает как раньше, страница модератора без второго пароля — `401`.

## Шаг 7. Tilda — включить онлайн-режим на странице

В блоке T123 с каталогом добавьте атрибут `data-live` рядом с `data-curator`:

```html
<div id="artrostov-catalog"
     data-base="https://donexpocentre.ru/static/artcatalog/"
     data-tilda-popup="popup:artbuy"
     data-ticket-url="#"
     data-curator="https://donexpocentre.ru/api/artcatalog/curator/"
     data-live="https://donexpocentre.ru/api/artcatalog/live/"
     data-privacy="https://арт-ростов.рф/ссылка-на-политику"></div>
```

`data-privacy` — адрес вашей страницы «Политика обработки персональных
данных» (скопируйте его из адресной строки браузера): ссылка на неё стоит
рядом с галочкой согласия. В саму политику добавьте раздел из
`server/privacy-live.md`. Что ещё нужно по закону — `server/LEGAL.md`.

Опубликуйте страницу. Онлайн-режим включается у посетителя сразу: он
появляется на выставке как «Гость NN» в случайном образе, над каталогом и в
зале — кнопка «На выставке: N». Имя и образ можно сменить («Изменить»),
выключить — «Офлайн». Приглашать и переписываться — после согласия на
обработку персональных данных (галочка в окне «Имя и образ»).

Проверка вдвоём: откройте страницу на компьютере и на телефоне, войдите под
разными именами — каждый увидит другого в списке «Сейчас на выставке» и
сможет пригласить к разговору.

## Модерация

### Как войти

1. Откройте в браузере (на компьютере удобнее):
   **https://donexpocentre.ru/api/artcatalog/live/admin**
2. Браузер спросит логин и пароль — это второй пароль (логин `moder`,
   шаг 6). Затем на странице введите пароль модератора — тот, что вписан
   после `LIVE_ADMIN_PASSWORD=` в `/etc/artcatalog-live.env` (шаг 3). Браузер помнит вход 12 часов;
   «Выйти» — справа вверху.
3. Забыли пароль — задайте новый: `sudo nano /etc/artcatalog-live.env`,
   исправьте строку, сохраните, затем `sudo systemctl restart artcatalog-live`.

Не пересылайте пароль и не входите с чужих компьютеров. Пять неверных
попыток подряд — вход с этого адреса закрывается на 15 минут.

### Вкладки

- **Сейчас** — кто на выставке прямо сейчас и где (зал, художник);
  **жалобы** посетителей (сверху, самые новые) с кнопками «Открыть
  разговор» и «Разобрано»; действующие блокировки; статистика и сроки
  хранения.
- **Переписка** — все разговоры: кто пригласил, кого, состояние, число
  сообщений, дата. Поиск по имени, id посетителя или слову из текста,
  фильтр по датам. Нажмите на строку — откроется весь разговор:
  - сообщения видны **как их написали** (посетители видят грубые слова
    как `***`);
  - «Удалить» у сообщения — оно исчезнет и у посетителей; «Вернуть» —
    восстановить;
  - «Заблокировать» у участника — на срок (дней) или навсегда, по желанию
    и по IP-адресу.
- **Посетители** — все, кто входил: имя, id, первый и последний визит,
  **дата согласия** на обработку данных, IP-адрес; «Переписка» — все его
  разговоры; «Заблокировать». IP-адрес и браузер хранятся только у тех, кто
  дал согласие; у остальных адрес виден, пока они онлайн (и блокировка по
  адресу тоже работает, пока они онлайн).
- **Блокировки** — кто заблокирован, причина, до какого числа; «Снять».
- **Выгрузить всё в CSV** — вся переписка одним файлом, открывается в
  Excel (для архива или ответа на официальный запрос — см. `LEGAL.md`).

Блокировка по IP сложнее обходится, но может задеть людей из той же сети
(офис, мобильный оператор) — ставьте её за грубые или повторные нарушения.

### Сроки хранения

Служба сама (раз в час):
- **стирает текст** сообщений старше **180 дней** — в панели вместо него
  «текст удалён: истёк срок хранения», сам факт (кто, кому, когда) остаётся;
- **удаляет целиком** сведения о посетителях, не заходивших **3 года**
  (1095 дней), и о переписке старше 3 лет.

Так требует 149-ФЗ ст. 10.1 от организатора распространения информации
(см. `LEGAL.md`). Действующие блокировки остаются. В журнале — строка
«очистка по сроку хранения». Сроки — `LIVE_KEEP_MSG_DAYS` и
`LIVE_KEEP_VISITOR_DAYS` в `/etc/artcatalog-live.env`; если меняете —
поправьте и политику на сайте.

## Дальше

- **Журнал** — входы, приглашения, жалобы, действия модератора:
  `journalctl -u artcatalog-live -f` (выход — `Ctrl+C`). Посетители в нём —
  только по коду (`a1b2c3d4`), без имён и адресов: журнал хранится дольше
  сроков из политики. Имя по коду — во вкладке «Посетители».
- **Новая версия службы** — заменить `/opt/artcatalog-live/live_server.py`
  (как в шаге 1) и `sudo systemctl restart artcatalog-live`. Переписка
  остаётся: она в базе, а не в службе.
- **Аватары (8 образов на пол)** — служба принимает образ `outfit` 0…7;
  старая версия (0…3) превращала бы новые образы в «0». Поэтому вместе с
  папкой `avatars/` обновите и службу (пункт выше). Сами модели лежат в
  статике (`/static/artcatalog/avatars/`), служба их не касается.
- **Сменить пароль модератора** — поправить `/etc/artcatalog-live.env`,
  затем `sudo systemctl restart artcatalog-live`.
- **Резервная копия переписки** — раз в сутки, автоматически:

  ```bash
  which sqlite3
  sudo cp /opt/artcatalog-live/live-backup.sh /etc/cron.daily/artcatalog-live-backup
  sudo chmod 755 /etc/cron.daily/artcatalog-live-backup
  sudo /etc/cron.daily/artcatalog-live-backup && sudo ls -l /home/develop/artcatalog-live-backup
  ```

  Копии — в `/home/develop/artcatalog-live-backup/live-ГГГГ-ММ-ДД.db`,
  хранятся 7 дней (дольше не держим: в них данные, удалённые по сроку
  хранения). Просто скопировать `live.db` нельзя — база в режиме WAL,
  свежие сообщения лежат в `live.db-wal`, и копия выйдет неполной.
  Восстановить из копии:

  ```bash
  sudo systemctl stop artcatalog-live
  D=/home/develop/.local/share/artcatalog-live
  sudo -u develop cp $D/live.db $D/live.db.before-restore
  sudo rm -f $D/live.db-wal $D/live.db-shm
  sudo -u develop cp /home/develop/artcatalog-live-backup/live-ГГГГ-ММ-ДД.db $D/live.db
  sudo chmod 600 $D/live.db
  sudo systemctl start artcatalog-live
  ```
- **Выключить** — убрать `data-live` в Tilda и
  `sudo systemctl disable --now artcatalog-live`.
