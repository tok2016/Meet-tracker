
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

export {camelToSnake, snakeToCamel};
