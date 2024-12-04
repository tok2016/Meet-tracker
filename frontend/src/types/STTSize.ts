export const STTModels = ['tiny', 'tiny.en', 'base', 'base.en', 'small', 'small.en', 'medium', 'medium.en', 'large', 'large-v2', 'large-v3', 'turbo'] as const;

export type STTModel = typeof STTModels[number];
