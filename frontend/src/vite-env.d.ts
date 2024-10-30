/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly AUDIO_STORAGE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
