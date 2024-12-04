export const STTDevices = ['cpu', 'cuda'] as const;

export type STTDevice = typeof STTDevices[number];
