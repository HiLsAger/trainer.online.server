# trainer.online.server

## 🚀 Описание

Проект состоит из двух частей:

* **Backend** — NestJS (`trainer.online.server`)
* **Database** — MySQL

---

# 🧪 Development (локальная разработка)

## 📦 Требования

* Node.js 18+
* Yarn
* Docker (желательно для БД)

---

## 🔧 nestJS

```bash
cd trainer.online.server

yarn install
```

Создать `.env`:

```env
APP_PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=trainer
```

Запуск:

```bash
yarn start:dev
```

API будет доступен:

```text
http://localhost:3000
```

---

## 🗄️ Database (MySQL через Docker)

```bash
docker run -d \
  --name trainer-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=trainer \
  -p 3306:3306 \
  mysql:8.0
```

---

# 🏭 Production (Docker)

## 📦 Требования

* Docker
* Docker Compose

---

## ⚙️ Backend

```bash
cd trainer.online.server
docker compose up --build -d
```

---

## 🌐 Доступ

Настройки через `.env`:

```env
DB_HOST=mysql
DB_PORT=3306
DB_USER=trainer
DB_PASSWORD=secret
DB_NAME=trainer
```

---