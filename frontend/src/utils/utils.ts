import MediaValue from './types/MediaValue';
import Summary, { RawSummaryContent, SmallSummary, SummaryContent, SummaryInfo } from './types/Summary';
import TopicContent, { isTopicContent } from './types/TopicContent';

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

const snakeToCamel = (obj: object) => {
  const result = obj;

  for (const key in obj) {
    const camel = key.replace(/[_][a-z]/g, (symbols) => symbols.toUpperCase().replace('_', ''));

    if(camel !== key) {
      result[camel as keyof typeof obj] = obj[key as keyof typeof obj];
      delete result[key as keyof typeof obj];
    }
  }

  return result;
};

const arraySnakeToCamel = <Type, >(arr: object[]) => arr.map((obj) => snakeToCamel(obj)) as Type[];

const getOffsetQuery = (page: number) => `offset=${(page - 1) * ITEMS_PER_PAGE}&limit=${ITEMS_PER_PAGE}`;

const getLocaleString = (dateString: string) => new Date(dateString).toLocaleDateString('ru-RU', {
  weekday: undefined,
  year: 'numeric',
  day: '2-digit',
  month: '2-digit'
});

const parseTopicContent = (content: string): TopicContent => {
  const stringEntry = content.split(/\w+[a-z][=]/g).find((s) => s.includes('topic'));
  const stringJsonSingular = stringEntry?.match(/{.{1,}}/g);
  const stringJson = stringJsonSingular ? stringJsonSingular[0].replace(/'/g, '"') : '';
  const rawContent = JSON.parse(stringJson);

  const defaultContent: TopicContent = {
    topic: '',
    text: '',
    start: '',
    end: '',
    speakers: ''
  };

  return isTopicContent(rawContent['args']) ? rawContent['args'] as TopicContent : defaultContent;
}

const getSummaryContent = (rawContent: RawSummaryContent): SummaryContent => {
  const topics = Object.entries(rawContent);

  const result: SummaryContent = {};

  topics.forEach((pair) => {
    result[pair[0] as keyof SummaryContent] = parseTopicContent(pair[1]);
  });

  return result;
};

const getFullSummary = (rawSummary: SmallSummary): Summary => ({
    id: rawSummary.id ?? 0,
    userId: 1,
    title: 'Meeting 1',
    date: rawSummary.date ?? new Date().toISOString(),
    text: rawSummary.text 
      ? (typeof rawSummary.text === 'string' ? getSummaryContent(JSON.parse(rawSummary.text)) : getSummaryContent(rawSummary.text)) 
      : {},
    status: 'success',
    record: {
      id: 1,
      userId: 1,
      file: '',
      isArchived: false
    },
    audioId: rawSummary.audioId ?? '0'
  }
);

const getFullSummaries = (rawSummaries: SmallSummary[]): SummaryInfo[] => rawSummaries.map((rawSummary) => ({
  id: rawSummary.id,
  title: 'Meeting 1',
  date: rawSummary.date,
  status: 'success',
  record: {
    id: 1,
    userId: 1,
    file: '',
    isArchived: false
  },
  audioId: rawSummary.audioId,
  hasText: rawSummary.text !== undefined
}))

export {camelToSnake, snakeToCamel, arraySnakeToCamel, getOffsetQuery, getLocaleString, 
  getFullSummary, getFullSummaries, getSummaryContent,
  LOGO_WIDTH, AVATAR_WIDTH, AVATAR_EDITOR_WIDTH, statusesTranslations, 
  TOKEN_TIME_TO_LIVE, INPUT_ICON_WIDTH, BASE_URL, ITEMS_PER_PAGE};
