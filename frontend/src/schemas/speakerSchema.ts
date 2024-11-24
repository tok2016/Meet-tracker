import { object, ObjectSchema, string } from 'yup';
import SpeakerContent from '../types/SpeakerContent';
import { screenSymbols } from '../utils/utils';

const MIN_NAME_LENGTH = 1;
const MAX_NAME_LENGTH = 50;

const speakerSchema: ObjectSchema<SpeakerContent> = object({
  speakerName: string()
                .min(MIN_NAME_LENGTH)
                .max(MAX_NAME_LENGTH)
                .transform(screenSymbols)
                .default('Спикер'),
  speakerInfo: string()
                .transform(screenSymbols)
                .default('')
});

export default speakerSchema;
