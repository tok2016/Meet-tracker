import SpeakerContent from './SpeakerContent';

export default interface TopicContent {
  topic: string,
  text: string,
  start: string,
  end: string,
  speakers: SpeakerContent[],
  tasks?: string
};

export type TopicFull = {
  id: string,
  name: string,
  args: TopicContent,
  type: string
};

export const isTopicContent = (content: object): content is TopicContent => (content as TopicContent).topic !== undefined;
