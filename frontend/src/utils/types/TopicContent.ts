export default interface TopicContent {
  topic: string,
  text: string,
  start: string,
  end: string,
  speakers: string,
  tasks?: string
};

export const isTopicContent = (content: object): content is TopicContent => (content as TopicContent).topic !== undefined;
