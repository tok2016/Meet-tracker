import Filter from '../types/Filter';
import SpeakerContent, { SpeakerArrayContent } from '../types/SpeakerContent';
import Summary, { RawSummary, SummaryInfo } from '../types/Summary';
import TopicContent, { isTopicContent, isTopicRaw } from '../types/TopicContent';
import { User } from '../types/User';

const ITEMS_PER_PAGE = 20;

const TOKEN_TIME_TO_LIVE = 1000 * 60 * 24 * 7;

const FILTER_DATE_OFFSET = 1000 * 60 * 24 * 2;

const INPUT_ICON_WIDTH = '1.5em';

const PHONE_NUMBER_LENGTH = 10;

const statusesTranslations = {
  ['idle']: 'Генерация',
  ['pending']: 'Генерация',
  ['success']: 'Готово',
  ['error']: 'Ошибка'
};

const jsonTypes = {
  ['number']: 'Number',
  ['string']: 'String',
  ['boolean']: 'Boolean',
  ['object']: 'Object',
  ['array']: 'Array',
  ['date']: 'Date',
  ['binary']: 'Binary'
};

const camelToSnake = (obj: object) => {
  const result = {...obj};

  for (const key in obj) {
    const typedKey = key as keyof typeof obj;
    const snake = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`) as keyof typeof obj;

    const value = obj[typedKey] as any;

    if(value.map !== undefined) {
      result[typedKey] = value.map((subObj: object) => camelToSnake(subObj)) as never;
    } else if(typeof value === 'object') {
      result[typedKey] = camelToSnake(value) as never;
    } else {
      result[typedKey] = obj[typedKey];
    }

    if(snake !== key) {
      result[snake] = result[typedKey];
      delete result[typedKey];
    }
  }

  return result;
};

const snakeToCamel = <Type, >(obj: object): Type => {
  const result = obj;

  for (const key in obj) {
    const camel = key.replace(/[_][a-z]/g, (symbols) => symbols.toUpperCase().replace('_', ''));

    if(camel !== key) {
      const value = obj[key as keyof typeof obj];
      result[camel as keyof typeof obj] = typeof value === 'object' ? snakeToCamel<typeof value>(value) : value;
      delete result[key as keyof typeof obj];
    }
  }

  return result as Type;
};

const arrayCamelToSnake = (arr: object[]) => arr.map((obj) => camelToSnake(obj));

const arraySnakeToCamel = <Type, >(arr: object[]) => arr.map((obj) => snakeToCamel(obj)) as Type[];

const getOffsetQuery = (page: number) => `offset=${(page - 1) * ITEMS_PER_PAGE}&limit=${ITEMS_PER_PAGE}`;

const getLocaleString = (dateString?: string) => new Date(dateString ?? '').toLocaleDateString('ru-RU', {
  weekday: undefined,
  year: 'numeric',
  day: '2-digit',
  month: '2-digit'
});

const speakersObjectToArray = (obj: SpeakerArrayContent): SpeakerContent[] => obj.speakerName.map((name, i) => ({
  speakerName: name,
  speakerInfo: obj.speakerInfo[i]
}));

const formTimeCode = (timeCode: string): string => timeCode.split(',')[0];

const getTopic = (content: TopicContent): TopicContent => ({
  ...content,
  start: formTimeCode(content.start),
  end: formTimeCode(content.end),
  speakers: content.speakers.length !== undefined 
    ? arraySnakeToCamel<SpeakerContent>(content.speakers)
    : speakersObjectToArray(snakeToCamel<SpeakerArrayContent>(content.speakers))
});

const parseSummaryContent = (content: string): TopicContent[] => {
  const parsedRawContent = JSON.parse(content);
  const topics: TopicContent[] = [];

  if(isTopicRaw(parsedRawContent)) {
    parsedRawContent.segments.forEach((raw) => {
      topics.push(getTopic(raw));
    });
  } else if(isTopicContent(parsedRawContent)) {
    topics.push(getTopic(parsedRawContent));
  }

  return topics;
};

const getFullSummary = (rawSummary: RawSummary, audio: string = ''): Summary => ({
    ...rawSummary,
    text: parseSummaryContent(rawSummary.text),
    status: 'success',
    audio
  }
);

const getFullSummaries = (rawSummaries: RawSummary[]): SummaryInfo[] => rawSummaries.map((rawSummary) => ({
  ...rawSummary,
  status: 'success',
  hasText: rawSummary.text !== undefined,
}));

const getCollectionQuery = (page: number, filter: Filter) => (typeof filter.title === 'undefined'
  ? (
    `page=${page - 1}&size=${ITEMS_PER_PAGE}&username__like=${filter.username}&registration_date__gte=${filter.from}&registration_date__lte=${filter.to}&first_name__like=${filter.name}&order_by=${filter.direction > 0 ? '' : '-'}${filter.sort === 'date' ? 'registration_date' : filter.sort}`
  )
  : (
    `page=${page - 1}&size=${ITEMS_PER_PAGE}&title__like=${filter.title}&creation_date__gte=${filter.from}&creation_date__lte=${filter.to}&order_by=${filter.direction > 0 ? '' : '-'}${filter.sort === 'date' ? 'creation_date' : filter.sort}`
  )
);

const getFilterWithDates = (filter: Filter) => ({
  ...filter,
  from: filter.from ? filter.from : '2011-01-01T00:00:00.000Z',
  to: filter.to ? filter.to : (new Date(Date.now() + FILTER_DATE_OFFSET)).toISOString()
});

const screenSymbols = (str: string) => str.replace(/[~`!@#$%^&*()_\-+=|:;,.?<>{}\[\]]/g, (letter) => `\\${letter}`);

const areObjectsEqual = (a: object, b: object) => JSON.stringify(a) === JSON.stringify(b);

const getPageTitle = (routeName: string) => `${routeName} — Brify`;

const reformUser = (user: User): User => ({
  ...user,
  phoneNumber: user.phoneNumber.length === PHONE_NUMBER_LENGTH ? `+7${user.phoneNumber}` : user.phoneNumber
});

export {camelToSnake, snakeToCamel, arraySnakeToCamel, arrayCamelToSnake, getOffsetQuery, getLocaleString, screenSymbols, reformUser,
  getFullSummary, getFullSummaries, getCollectionQuery, parseSummaryContent, getFilterWithDates, areObjectsEqual, getPageTitle,
  statusesTranslations, jsonTypes, TOKEN_TIME_TO_LIVE, INPUT_ICON_WIDTH, ITEMS_PER_PAGE, PHONE_NUMBER_LENGTH};
