import { TTLUnit } from './TTLUnit';

export default interface DatabaseSettings {
  ttlValue: number,
  ttlUnit: TTLUnit
};

export const defaultDatabaseSettings: DatabaseSettings = {
  ttlValue: 1,
  ttlUnit: 'month'
};
