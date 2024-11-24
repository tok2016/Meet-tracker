import { array, object, ObjectSchema, string } from 'yup';
import TopicContent from '../types/TopicContent';
import { screenSymbols } from '../utils/utils';
import speakerSchema from './speakerSchema';

const MIN_TOPIC_LENGTH = 1;
const MAX_TOPIC_LENGTH = 50;

const topicSchema: ObjectSchema<TopicContent> = object({
  topic: string()
          .min(MIN_TOPIC_LENGTH)
          .max(MAX_TOPIC_LENGTH)
          .transform(screenSymbols)
          .default('Неопределённая тема'),
  text: string().transform(screenSymbols).default(''),
  start: string().default(''),
  end: string().default('0'),
  speakers: array().of(speakerSchema).default([])
});

export default topicSchema;
