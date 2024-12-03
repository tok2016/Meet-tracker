export const STTComputeModels = ['int8', 'int8_float16', 'float16'] as const;

export type STTCompute = typeof STTComputeModels[number];
