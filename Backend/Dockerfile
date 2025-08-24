# backend.Dockerfile
FROM python:3.13-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_VERSION=2.0.0 \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_CREATE=false

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Установка poetry
RUN pip install --no-cache-dir "poetry==$POETRY_VERSION"

# Копируем файлы зависимостей
COPY pyproject.toml poetry.lock* /app/
WORKDIR /app/Backend

# Ставим только production зависимости
RUN poetry install --only main --no-root

# Копируем исходники бекенда
COPY Backend/ ./Backend

# Создаём пользователя
RUN adduser --disabled-password --gecos "" appuser && chown -R appuser:appuser /app
USER appuser

VOLUME ["/app/data"]

ENV DATABASE_URL="sqlite:////app/data/app.db"

EXPOSE 8000

# ⚠️ Проверь путь к FastAPI приложению (здесь предполагаем Backend/src/main.py -> app)
CMD ["uvicorn", "Backend.src.main:app", "--host", "0.0.0.0", "--port", "8000"]