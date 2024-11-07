/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SOUNDS_LOCATION: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
