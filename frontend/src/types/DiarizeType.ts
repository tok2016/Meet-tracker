export const DiarizeTypes = ['Neural', 'Clustering'] as const;

export type DiarizeType = typeof DiarizeTypes[number];
