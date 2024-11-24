import { array, object, ObjectSchema, string } from 'yup';
import { SummaryInput } from '../types/Summary';
import { getLocaleString, screenSymbols } from '../utils/utils';
import topicSchema from './topicSchema';

const MIN_TITLE_LENGTH = 1;
const MAX_TITLE_LENGTH = 50;

const summarySchema: ObjectSchema<SummaryInput> = object({
  title: string()
          .min(MIN_TITLE_LENGTH)
          .max(MAX_TITLE_LENGTH)
          .transform(screenSymbols)
          .default(() => `Запись ${getLocaleString()}`),
  text: array().of(topicSchema).default([]),
});

export default summarySchema;
