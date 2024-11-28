export const Languages = ['de', 'en', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'zh'] as const;

export type Language = typeof Languages[number];

export const MappedLanguages: Record<Language, string> = {
  'de': 'Немецкий',
  'en': 'Английский',
  'es': 'Испанский',
  'fr': 'Французский',
  'hi': 'Хинди',
  'it': 'Итальянский',
  'pt': 'Португальский',
  'ru': 'Русский',
  'zh': 'Китайский'
};
