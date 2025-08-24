# FreeChat

Простой мессенджер с фронтендом на Vite/React и бэкендом на FastAPI.

---

# 🚀 Запуск проекта

## 1️⃣ Через Docker Compose (рекомендуется)

В корне проекта:

```bash
docker compose up --build
```
##	Поднимет два сервиса:
###	api — FastAPI, доступен на 
```bash
http://localhost:8000
```
###	web — фронтенд, доступен на
```bash
http://localhost:4173
```

⸻

## 2️⃣ Локальный запуск фронтенда
###	1.	Перейти в папку фронтенда:
```bash
cd Frontend
```

###	2.	Установить зависимости:
```bash
npm install
```
###	3.	Запустить dev-сервер:
```bash
npm run dev
```
### •	Фронтенд будет доступен на 
```bash
http://localhost:5173.
```


⸻

## 3️⃣ Локальный запуск бэкенда
###	1.	Установить Python 3.13 и Poetry.
###	2.	Создать виртуальное окружение в Backend:
```bash
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
.venv\Scripts\activate     # Windows
```
###	3.	Установить зависимости(запускать в корне проекта):
```bash
poetry install
```
### 4.	Запустить сервер:
```bash
uvicorn Backend.src.main:app --reload --host 127.0.0.1 --port 8000
```
###	•	Бэкенд будет доступен на
```bash
 http://localhost:8000.
 ```