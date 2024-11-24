export default interface JSONField {
  type: string,
  description?: string,
  properties?: {[key: string]: JSONField},
  items?: JSONField
};

export type JSONSchema = {[key: string]: JSONField};

export const defaultItemsField: JSONField = {
  type: 'number',
  description: ''
};
