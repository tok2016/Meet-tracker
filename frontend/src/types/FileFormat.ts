export const FileFormats = ['txt', 'pdf', 'doc'] as const;

export type FileFormat = typeof FileFormats[number];
