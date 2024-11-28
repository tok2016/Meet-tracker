export default interface JSONField {
  id: number,
  type: string,
  description?: string,
  properties?: {[key: string]: JSONField},
  items?: JSONField
};

export type JSONSchema = {[key: string]: JSONField};

export const defaultItemsField: JSONField = {
  id: Date.now(),
  type: 'number',
  description: ''
};
