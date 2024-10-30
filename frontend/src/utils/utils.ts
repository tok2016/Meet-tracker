import MediaValue from './types/MediaValue';

const TOKEN_TIME_TO_LIVE = 1000 * 60 * 24 * 7;

const LOGO_WIDTH: MediaValue = {
  xs: 20,
  sm: 50,
  md: 100,
  lg: 150,
  xl: 200
};

const AVATAR_WIDTH: MediaValue = {
  xs: 10,
  sm: 25,
  md: 45,
  lg: 65,
  xl: 95
}

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

export {camelToSnake, snakeToCamel, LOGO_WIDTH, AVATAR_WIDTH, statusesTranslations, TOKEN_TIME_TO_LIVE};
