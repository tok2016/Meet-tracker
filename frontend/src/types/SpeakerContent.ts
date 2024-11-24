export default interface SpeakerContent {
  speakerName: string,
  speakerInfo: string
};

export type SpeakerWithIndex = SpeakerContent & {index: number};

export type SpeakerArrayContent = {
  speakerName: string[],
  speakerInfo: string[]
};
