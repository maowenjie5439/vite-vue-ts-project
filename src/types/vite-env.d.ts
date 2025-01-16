/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_APP_API_BASE_URL: string
    VITE_APP_USE_MOCK: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}