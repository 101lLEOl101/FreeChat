/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    // добавь другие переменные окружения здесь
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}