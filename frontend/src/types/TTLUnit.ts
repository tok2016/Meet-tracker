export const TTLUnits = ['day', 'week', 'month', 'year'] as const;

export type TTLUnit = typeof TTLUnits[number];

export const TTLUnitTranslation: {[key in TTLUnit]: string} = {
  day: 'День',
  week: 'Неделя',
  month: 'Месяц',
  year: 'Год'
};
