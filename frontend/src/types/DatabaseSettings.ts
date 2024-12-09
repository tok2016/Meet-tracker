import { TTLUnit } from './TTLUnit';

export default interface DatabaseSettings {
  ttlValue: number,
  ttlUnit: TTLUnit
};

export type DatabaseSettingsRaw = {
  ttl: number;
};

export const defaultDatabaseSettings: DatabaseSettings = {
  ttlValue: 1,
  ttlUnit: 'month'
};

export const isDatabaseSettings = (settings: unknown): settings is DatabaseSettings => (settings as DatabaseSettings).ttlValue !== undefined;
