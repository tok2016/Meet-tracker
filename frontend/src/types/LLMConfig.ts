import LLMDetails from './LLMDetails';

export default interface LLMConfig {
  name: string,
  modifiedAt: string,
  size: number,
  digest: string,
  url: string,
  details: LLMDetails
};
