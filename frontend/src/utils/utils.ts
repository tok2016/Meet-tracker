import Filter from './types/Filter';
import MediaValue from './types/MediaValue';
import Summary, { RawSummary, SummaryInfo } from './types/Summary';
import TopicContent, { TopicFull } from './types/TopicContent';

const BASE_URL = 'http://127.0.0.1:8000';

const ITEMS_PER_PAGE = 20;

const TOKEN_TIME_TO_LIVE = 1000 * 60 * 24 * 7;

const INPUT_ICON_WIDTH = '1.5em';

const LOGO_WIDTH: MediaValue = {
  xs: 20,
  sm: 40,
  md: 80,
  lg: 120,
  xl: 200
};

const AVATAR_WIDTH: MediaValue = {
  xs: 10,
  sm: 25,
  md: 40,
  lg: 60,
  xl: 90
};

const AVATAR_EDITOR_WIDTH: MediaValue = {
  xs: 50,
  sm: 100,
  md: 200,
  lg: 350,
  xl: 500
};

const statusesTranslations = {
  ['idle']: 'Генерация',
  ['pending']: 'Генерация',
  ['success']: 'Готово',
  ['error']: 'Ошибка'
};

const camelToSnake = (obj: object) => {
  const result = obj;

  for (const key in obj) {
    const snake = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

    if(snake !== key) {
      result[snake as keyof typeof obj] = obj[key as keyof typeof obj];
      delete result[key as keyof typeof obj];
    }
  }

  return result;
};

const snakeToCamel = <Type, >(obj: object): Type => {
  const result = obj;

  for (const key in obj) {
    const camel = key.replace(/[_][a-z]/g, (symbols) => symbols.toUpperCase().replace('_', ''));

    if(camel !== key) {
      result[camel as keyof typeof obj] = obj[key as keyof typeof obj];
      delete result[key as keyof typeof obj];
    }
  }

  return result as Type;
};

const arraySnakeToCamel = <Type, >(arr: object[]) => arr.map((obj) => snakeToCamel(obj)) as Type[];

const getOffsetQuery = (page: number) => `offset=${(page - 1) * ITEMS_PER_PAGE}&limit=${ITEMS_PER_PAGE}`;

const getLocaleString = (dateString: string) => new Date(dateString).toLocaleDateString('ru-RU', {
  weekday: undefined,
  year: 'numeric',
  day: '2-digit',
  month: '2-digit'
});

const parseSummaryContent = (content: string): TopicContent[] => {
  const stringEntry = content.split(/\w+[a-z][=]/g).find((s) => s.includes('topic'));
  const stringJsonSingular = stringEntry?.replace(/'/g, '"');

  if(!stringJsonSingular) {
    return [];
  }

  const topics: TopicContent[] = [];

  const parsedRawContent = JSON.parse(stringJsonSingular) as TopicFull[];
  parsedRawContent.map((raw) => topics.push(raw.args));

  return topics;
};

const getFullSummary = (rawSummary: RawSummary): Summary => ({
    ...rawSummary,
    text: parseSummaryContent(rawSummary.text),
    status: 'success',
  }
);

const getFullSummaries = (rawSummaries: RawSummary[]): SummaryInfo[] => rawSummaries.map((rawSummary) => ({
  ...rawSummary,
  status: 'success',
  hasText: rawSummary.text !== undefined
}));

const getCollectionQuery = (page: number, filter: Filter) => (typeof filter.title === 'undefined'
  ? (
    `page=${page - 1}&size=${ITEMS_PER_PAGE}&username__like=${filter.username}&registration_date__gte=${filter.from}&registration_date__lte=${filter.to}&first_name__like=${filter.name}&order_by=${filter.direction > 0 ? '' : '-'}${filter.sort === 'date' ? 'registration_date' : filter.sort}`
  )
  : (
    `page=${page - 1}&size=${ITEMS_PER_PAGE}&title__like=${filter.title}&creation_date__gte=${filter.from}&creation_date__lte=${filter.to}&order_by=${filter.direction > 0 ? '' : '-'}${filter.sort === 'date' ? 'creation_date' : filter.sort}`
  )
);

export {camelToSnake, snakeToCamel, arraySnakeToCamel, getOffsetQuery, getLocaleString, 
  getFullSummary, getFullSummaries, getCollectionQuery, parseSummaryContent,
  LOGO_WIDTH, AVATAR_WIDTH, AVATAR_EDITOR_WIDTH, statusesTranslations, 
  TOKEN_TIME_TO_LIVE, INPUT_ICON_WIDTH, BASE_URL, ITEMS_PER_PAGE};
