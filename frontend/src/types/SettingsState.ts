import DefaultState from './DefaultState';
import LLMConfig from './LLMConfig';
import LLMSettings from './LLMSettings';
import STTConfig from './STTConfig';

export default interface SettingsState extends DefaultState {
  llm: LLMSettings,
  llms: LLMConfig[]
  stt: STTConfig
};
