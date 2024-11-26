import { Language } from './Language';
import { STTOutput } from './STTOutput';

export default interface STTConfig {
  encode: boolean,
  language: Language,
  initialPrompt: string,
  wordTimestamps: boolean,
  output: STTOutput
};

export const defaultSTTConfig: STTConfig = {
  encode: true,
  language: 'en',
  initialPrompt: '',
  wordTimestamps: true,
  output: 'txt'
}
