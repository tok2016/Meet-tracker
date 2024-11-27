import { Language } from './Language';
import { STTOutput } from './STTOutput';
import { STTSize } from './STTSize';

export default interface STTConfig {
  language: Language,
  initialPrompt: string,
  output: STTOutput,
  modelSize: STTSize
};

export const defaultSTTConfig: STTConfig = {
  language: 'en',
  initialPrompt: '',
  output: 'txt',
  modelSize: 'large-v3'
}
