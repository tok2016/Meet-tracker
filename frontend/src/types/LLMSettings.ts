import { JSONSchema } from './JSONSchema';
import defaultSchema from '../utils/defaultSchema.json';

export default interface LLMSettings {
  name: string,
  parameterSize: string,
  prompt: string,
  summaryStructure: JSONSchema
};

export type LLMSettingsRaw = Omit<LLMSettings, 'summaryStructure'> & {summaryStructure: string};

export const defaultLLMSettings: LLMSettings = {
  name: 'llama3.1',
  parameterSize: '8.03B',
  prompt: 'Give short summary of the text {lines}. Determine the topic of the text. Determine when it starts and ends. List speakers with names',
  summaryStructure: defaultSchema
};
