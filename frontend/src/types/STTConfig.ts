import { DiarizeType } from './DiarizeType';
import { STTCompute } from './STTCompute';
import { STTDevice } from './STTOutput';
import { STTModel } from './STTSize';

export default interface STTConfig {
  initialPrompt: string,
  whisperModel: STTModel,
  whisperDevice: STTDevice,
  whisperCompute: STTCompute,
  diarizeType: DiarizeType
};

export const defaultSTTConfig: STTConfig = {
  initialPrompt: '',
  whisperModel: 'large-v3',
  whisperDevice: 'cpu',
  whisperCompute: 'int8',
  diarizeType: 'Neural'
};

export const isSTTConfig = (settings: unknown): settings is STTConfig => (settings as STTConfig).whisperModel !== undefined;
