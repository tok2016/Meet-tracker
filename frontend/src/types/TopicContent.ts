import SpeakerContent from './SpeakerContent';

export default interface TopicContent {
  topic: string,
  text: string,
  start: string,
  end: string,
  speakers: SpeakerContent[]
};

export type TopicFull = {
  id: string,
  name: string,
  args: TopicContent,
  type: string
};

export type TopicRaw = {
  segments: TopicContent[]
};

export const isTopicContent = (content: object): content is TopicContent => (content as TopicContent).topic !== undefined;
export const isTopicRaw = (content: object): content is TopicRaw => (content as TopicRaw).segments !== undefined;
