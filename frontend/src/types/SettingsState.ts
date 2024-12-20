import DefaultState from './DefaultState';
import DatabaseSettings from './DatabaseSettings';
import EmailSettings from './EmailSettings';
import LLMConfig from './LLMConfig';
import LLMSettings from './LLMSettings';
import STTConfig from './STTConfig';

export default interface SettingsState extends DefaultState {
  llm: LLMSettings,
  llms: LLMConfig[]
  stt: STTConfig,
  email: EmailSettings,
  database: DatabaseSettings,
  llmError: string | undefined,
  sttError: string | undefined
};
