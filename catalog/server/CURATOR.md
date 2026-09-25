# Куратор с нейросетью GigaChat: установка на сервер

Сайт выставки — на Tilda, а Tilda не выполняет код на сервере. Ключ GigaChat
класть в страницу нельзя: любой посетитель увидит его в коде и сможет тратить
ваш лимит. Поэтому ключ живёт на вашем сервере **donexpocentre.ru** (том же,
где лежит статика каталога и где вы настраивали nginx), в маленькой службе
куратора — один файл на Python 3, без Django и сторонних библиотек.

```
посетитель на Tilda ──вопрос──▶ https://donexpocentre.ru/api/artcatalog/curator/ask/
                                   │ nginx
                                   ▼
                     служба куратора 127.0.0.1:8765 (ключ — здесь)
                                   │
                                   ▼
                              GigaChat (Сбер)
```

Без службы куратор тоже работает — отвечает готовыми ответами из
`curator/faq.json`. Служба добавляет ответы на любые вопросы о выставке и
художниках. Если GigaChat недоступен или закончился лимит — снова готовые
ответы, посетитель ошибки не видит.

Понадобится: вход на сервер по SSH с правами `sudo` (как при настройке
nginx), «Ключ авторизации» GigaChat, 20–30 минут.

---

## Шаг 1. Python 3 на сервере

```bash
python3 --version
```

Нужен **3.6 или новее**. Если команды нет:
Ubuntu/Debian — `sudo apt install python3`, CentOS/RHEL — `sudo dnf install python3`
(или `sudo yum install python3`).

Запомните путь к Python: `which python3` (обычно `/usr/bin/python3`).

## Шаг 2. Корневой сертификат НУЦ Минцифры

Серверы GigaChat подписаны российским удостоверяющим центром, которого нет в
стандартных сертификатах Linux. Без него соединение не установится.

```bash
sudo curl -o /etc/ssl/certs/russian_trusted_root_ca.pem https://gu-st.ru/content/lending/russian_trusted_root_ca_pem.crt
openssl x509 -in /etc/ssl/certs/russian_trusted_root_ca.pem -noout -subject -enddate -fingerprint -sha256
```

Должно быть:

```
subject=C = RU, O = The Ministry of Digital Development and Communications, CN = Russian Trusted Root CA
notAfter=Feb 27 21:04:15 2032 GMT
sha256 Fingerprint=D2:6D:2D:02:31:B7:C3:9F:92:CC:73:85:12:BA:54:10:35:19:E4:40:5D:68:B5:BD:70:3E:97:88:CA:8E:CF:31
```

Отпечаток другой — файл не тот, не продолжайте. Страница с сертификатом:
https://www.gosuslugi.ru/crt («Корневой сертификат», формат для Linux).

## Шаг 3. Файлы службы

```bash
sudo mkdir -p /opt/artcatalog-curator
cd /opt/artcatalog-curator
B=https://raw.githubusercontent.com/dimrurnd-cell/art/claude/repository-overview-h8lcj2/catalog/server/curator
sudo curl -fsSLO $B/curator_server.py
sudo curl -fsSLO $B/curator.env.example
sudo curl -fsSLO $B/artcatalog-curator.service
ls -l
```

Три файла: `curator_server.py`, `curator.env.example`, `artcatalog-curator.service`.
Если GitHub с сервера не открывается — залейте эти файлы из папки
`catalog/server/curator/` через WinSCP в `/opt/artcatalog-curator/`.

Узнайте, от чьего имени запускать службу — это владелец папки статики:

```bash
stat -c '%U' /home/develop/donexpo/static/artcatalog
```

Обычно `develop`. Запомните — понадобится в шаге 6.

## Шаг 4. Ключ и настройки

```bash
sudo cp /opt/artcatalog-curator/curator.env.example /etc/artcatalog-curator.env
sudo nano /etc/artcatalog-curator.env
```

Что вписать:

- `GIGACHAT_KEY=` — «Ключ авторизации» из личного кабинета GigaChat
  (developers.sber.ru, настройки API вашего проекта GigaChat) — длинная
  строка целиком, без кавычек и пробелов.
- `GIGACHAT_SCOPE=` — `GIGACHAT_API_PERS`, если проект на физлицо (Freemium);
  для юрлица — `GIGACHAT_API_B2B` (предоплата) или `GIGACHAT_API_CORP` (постоплата).
- `CURATOR_ORIGINS=` — адреса страниц, где стоит каталог: протокол и домен,
  через запятую, без `/` в конце. Там уже есть тестовая страница Tilda и
  арт-ростов.рф. Кириллический домен пишется в латинской записи (punycode):
  арт-ростов.рф → `xn----7sbh1cajbjfe.xn--p1ai`. Если каталог стоит на другом
  домене — допишите его, иначе браузер не даст странице спросить куратора.
- Остальное можно не трогать.

Сохранить: `Ctrl+O`, `Enter`, выйти: `Ctrl+X`. Закрыть файл от чужих глаз:

```bash
sudo chmod 600 /etc/artcatalog-curator.env
```

**Ключ существует только в этом файле.** Не присылайте его в чаты и письма,
не вставляйте в Tilda. Если ключ где-то засветился — в личном кабинете
GigaChat выпустите новый и замените строку в этом файле (шаг 9).

## Шаг 5. Самопроверка — до nginx и сайта

```bash
sudo python3 /opt/artcatalog-curator/curator_server.py --check --env /etc/artcatalog-curator.env
```

Хороший результат:

```
статика: /home/develop/donexpo/static/artcatalog
  готовых ответов: 14 | kb.md: 2000+ символов | художников: 129
сертификат: /etc/ssl/certs/russian_trusted_root_ca.pem — есть
✓ ключ принят, токен получен (scope GIGACHAT_API_PERS)
✓ GigaChat ответил: Выставка «Арт-Ростов» пройдёт с 16 по 25 апреля …
```

Если нет — под строкой с ✗ будет подсказка:

| Сообщение | Что делать |
|---|---|
| `не нашлись faq.json или artists.json` | в `CURATOR_STATIC` путь к папке статики каталога; залита ли папка `curator/` |
| `CERTIFICATE_VERIFY_FAILED` | шаг 2: сертификат скачан, путь в `GIGACHAT_CA` совпадает |
| `HTTP Error 401` / `400` | ключ скопирован не целиком или не тот `GIGACHAT_SCOPE` |
| `Connection reset`, `timed out`, `Network is unreachable` | серверу закрыты исходящие соединения на `ngw.devices.sberbank.ru:9443` и `api.giga.chat:443` — спросите хостинг |
| `HTTP Error 402` / `429` | закончился лимит токенов или слишком часто — личный кабинет GigaChat |

## Шаг 6. Служба systemd — чтобы куратор работал всегда

```bash
sudo cp /opt/artcatalog-curator/artcatalog-curator.service /etc/systemd/system/
sudo nano /etc/systemd/system/artcatalog-curator.service
```

Проверьте две строки:

- `User=develop` — имя из шага 3;
- `ExecStart=/usr/bin/python3 /opt/artcatalog-curator/curator_server.py` —
  путь к Python из шага 1.

Запуск и автозапуск после перезагрузки сервера:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now artcatalog-curator
systemctl status artcatalog-curator --no-pager
curl -s http://127.0.0.1:8765/api/artcatalog/curator/ping
```

Статус — `active (running)`, а проверка отвечает примерно так:

```
{"ok": true, "ai": true, "faq": 14, "artists": 129, "kb": 2000, "last_error": ""}
```

`"ai": false` — служба не видит ключ: проверьте `/etc/artcatalog-curator.env`
и перезапустите (`sudo systemctl restart artcatalog-curator`). Служба
слушает только сам сервер (127.0.0.1) — снаружи к ней можно попасть лишь
через nginx, открывать порты в файрволе не нужно.

## Шаг 7. nginx — адрес для страницы

Откройте тот же файл конфигурации, куда вставляли `location /static/artcatalog/`
(как в `server/README.md`, раздел про nginx), сначала — копия:

```bash
sudo grep -rln "static/artcatalog" /etc/nginx/      # покажет файл с блоком статики
sudo cp <файл> /root/nginx-before-curator.conf      # <файл> — путь из строки выше
sudo nano <файл>
```

Внутри того же блока `server { … }` (где `listen 443 ssl` и `server_name donexpocentre.ru`),
рядом с `location /static/artcatalog/`, вставьте блок из
`catalog/server/curator/nginx-curator.conf`:

```nginx
location /api/artcatalog/curator/ {
    proxy_pass http://127.0.0.1:8765;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_read_timeout 40s;
    client_max_body_size 16k;
}
```

Проверить и применить:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Если `nginx -t` ругается — верните копию (`sudo cp /root/nginx-before-curator.conf <файл>`)
и пришлите текст ошибки.

Проверка через внешний адрес (команды — на сервере):

```bash
curl -s https://donexpocentre.ru/api/artcatalog/curator/ping
curl -s -X POST -H "Content-Type: application/json" -d '{"q":"Расскажите про Шитову"}' https://donexpocentre.ru/api/artcatalog/curator/ask/
```

Второй запрос должен вернуть `"source": "ai"` и ответ про художницу.
`502 Bad Gateway` — служба не запущена (шаг 6); на CentOS/RHEL с SELinux ещё
может понадобиться `sudo setsebool -P httpd_can_network_connect 1`.
`404` — блок вставлен не в тот `server { … }`.

## Шаг 8. Tilda — включить куратора на странице

В блоке T123 с каталогом у `<div id="artrostov-catalog" …>` добавьте атрибут
`data-curator`:

```html
<div id="artrostov-catalog"
     data-base="https://donexpocentre.ru/static/artcatalog/"
     data-tilda-popup="popup:artbuy"
     data-ticket-url="#"
     data-curator="https://donexpocentre.ru/api/artcatalog/curator/"></div>
```

Опубликуйте страницу. Проверка: откройте её, подойдите к куратору, спросите
то, чего нет в готовых ответах, например «Какие работы у Шитовой?» или «Что
посмотреть любителю пейзажей?». Ответ должен быть про выставку, а не
«уточните у организаторов».

## Шаг 9. Дальше

- **Журнал** — вопросы посетителей и ошибки:
  `journalctl -u artcatalog-curator -f` (выход — `Ctrl+C`). По нему видно,
  о чём спрашивают, — удобно пополнять готовые ответы.
- **Ответы и сведения** правятся в статике: `curator/faq.json` и
  `curator/kb.md` — служба перечитывает их раз в 5 минут, перезапуск не нужен.
  Когда объявят цену билетов — впишите её в `kb.md` и в ответ `tickets`.
- **Новый ключ или другие настройки** — поправить `/etc/artcatalog-curator.env`,
  затем `sudo systemctl restart artcatalog-curator`.
- **Новая версия службы** — заменить `/opt/artcatalog-curator/curator_server.py`
  (как в шаге 3) и `sudo systemctl restart artcatalog-curator`.
- **Расход** — остаток токенов в личном кабинете GigaChat. Защита от
  перерасхода: не больше 20 вопросов в час с одного адреса и 3000 обращений к
  нейросети в сутки (`CURATOR_RATE`, `CURATOR_DAILY`); одинаковые вопросы
  сутки отвечаются из памяти без обращения к нейросети. Лимит исчерпан —
  куратор сам переходит на готовые ответы.
- **Выключить** — убрать `data-curator` в Tilda (куратор снова на готовых
  ответах) и `sudo systemctl disable --now artcatalog-curator`.
