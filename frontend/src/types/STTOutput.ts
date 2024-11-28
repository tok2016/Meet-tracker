export const STTOutputFormats = ['txt', 'json', 'vtt', 'srt', 'tsv'] as const;

export type STTOutput = typeof STTOutputFormats[number];
