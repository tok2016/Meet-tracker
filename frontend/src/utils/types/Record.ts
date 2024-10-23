export interface Record {
  id: number,
  userId: number,
  file: string,
  isArchived: boolean
};

export interface RecordInfo {
  id: number,
  hasFile: boolean,
  isArchived: boolean
};
