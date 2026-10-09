#!/bin/sh
# Резервная копия базы онлайн-режима: раз в сутки, хранится 7 дней.
# Установка (от root):
#   cp /opt/artcatalog-live/live-backup.sh /etc/cron.daily/artcatalog-live-backup
#   chmod 755 /etc/cron.daily/artcatalog-live-backup
# Проверка сразу: /etc/cron.daily/artcatalog-live-backup && ls -l /home/develop/artcatalog-live-backup
#
# Копия через sqlite3 .backup — верная и на ходу. Простое копирование файла
# теряет свежие сообщения: база в режиме WAL, часть данных лежит в live.db-wal.
# Работает от пользователя службы: иначе файлы журнала базы могли бы стать
# чужими для службы.
set -e
umask 077
USER_=develop
DB=/home/develop/.local/share/artcatalog-live/live.db
DIR=/home/develop/artcatalog-live-backup
KEEP_DAYS=7

# umask — внутри: su может выставить свой
su -s /bin/sh "$USER_" -c "umask 077; mkdir -p '$DIR' && chmod 700 '$DIR'"
su -s /bin/sh "$USER_" -c "umask 077; sqlite3 '$DB'" <<EOF
.timeout 10000
.backup '$DIR/live-$(date +%F).db'
EOF
find "$DIR" -name 'live-*.db' -mtime +"$KEEP_DAYS" -delete
