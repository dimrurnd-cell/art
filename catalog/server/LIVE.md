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
ls -l
```

Должно быть четыре файла. Если GitHub с сервера не открывается — залейте
файлы из папки `catalog/server/live/` через WinSCP в `/opt/artcatalog-live/`.

## Шаг 2. Папка для переписки

База с перепиской — один файл. Папку создаём от имени пользователя службы
(`develop`, как у куратора), иначе служба не сможет в неё писать:

```bash
sudo -u develop mkdir -p /home/develop/.local/share/artcatalog-live
```

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

```bash
sudo nginx -t && sudo systemctl reload nginx
curl -s https://donexpocentre.ru/api/artcatalog/live/ping
```

## Шаг 7. Tilda — включить онлайн-режим на странице

В блоке T123 с каталогом добавьте атрибут `data-live` рядом с `data-curator`:

```html
<div id="artrostov-catalog"
     data-base="https://donexpocentre.ru/static/artcatalog/"
     data-tilda-popup="popup:artbuy"
     data-ticket-url="#"
     data-curator="https://donexpocentre.ru/api/artcatalog/curator/"
     data-live="https://donexpocentre.ru/api/artcatalog/live/"></div>
```

Опубликуйте страницу. Появится кнопка «Онлайн-режим» — над каталогом и в
зале справа под кнопками.

Проверка вдвоём: откройте страницу на компьютере и на телефоне, войдите под
разными именами — каждый увидит другого в списке «Сейчас на выставке» и
сможет пригласить к разговору.

## Модерация

Страница модератора: **https://donexpocentre.ru/api/artcatalog/live/admin**
(пароль — из шага 3). На ней:

- **Сейчас** — кто онлайн и где, жалобы посетителей (сверху), статистика;
- **Переписка** — все разговоры, поиск по имени, id или слову из текста,
  по датам; открыть разговор, удалить сообщение (у посетителей оно тоже
  исчезнет), заблокировать участника;
- **Посетители** — все, кто когда-либо входил: имя, первый и последний
  визит, адрес;
- **Блокировки** — кто заблокирован, причина, до какого числа; снять.

Блокировка — на срок или навсегда; по желанию и по адресу (IP) — так
сложнее вернуться под другим именем, но может задеть людей из той же сети
(офис, мобильный оператор). Кнопка «Выгрузить всё в CSV» — вся переписка
одним файлом, открывается в Excel.

Модератор видит сообщения ровно так, как их написали; посетители — с
грубыми словами, заменёнными на `***`.

## Дальше

- **Журнал** — кто вошёл, приглашения, жалобы, действия модератора:
  `journalctl -u artcatalog-live -f` (выход — `Ctrl+C`).
- **Новая версия службы** — заменить `/opt/artcatalog-live/live_server.py`
  (как в шаге 1) и `sudo systemctl restart artcatalog-live`. Переписка
  остаётся: она в базе, а не в службе.
- **Сменить пароль модератора** — поправить `/etc/artcatalog-live.env`,
  затем `sudo systemctl restart artcatalog-live`.
- **Резервная копия переписки** — файл
  `/home/develop/.local/share/artcatalog-live/live.db`; копировать можно
  на ходу.
- **Выключить** — убрать `data-live` в Tilda и
  `sudo systemctl disable --now artcatalog-live`.
