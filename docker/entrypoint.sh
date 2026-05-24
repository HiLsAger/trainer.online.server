#!/bin/sh

echo "⏳ Waiting for DB..."

until nc -z $DB_HOST $DB_PORT; do
  sleep 1
done

echo "🚀 Running migrations..."

npx sequelize-cli db:migrate --env production --debug

echo "🔥 Starting app..."

node dist/main.js