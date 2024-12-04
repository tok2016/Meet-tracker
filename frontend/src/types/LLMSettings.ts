export default interface LLMSettings {
  llmModel: string
};

export const defaultLLMSettings: LLMSettings = {
  llmModel: 'ilyagusev/saiga_llama3'
};
