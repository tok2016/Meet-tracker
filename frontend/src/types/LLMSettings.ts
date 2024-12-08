export default interface LLMSettings {
  llmModel: string
};

export const defaultLLMSettings: LLMSettings = {
  llmModel: 'ilyagusev/saiga_llama3'
};

export const isLLMSettings = (settings: unknown): settings is LLMSettings => (settings as LLMSettings).llmModel !== undefined;
