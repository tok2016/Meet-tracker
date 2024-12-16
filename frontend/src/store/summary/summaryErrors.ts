import ErrorMessage from '../../types/ErrorMessage';
import { DefaultErrors } from '../../utils/Error';

const RECORD_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Данный формат не поддерживается'
};

const SUMMRY_GET_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Не удалось получить резюме',
  'ERR_NOT_FOUND': 'Резюме не найдено'
};

const SUMMRY_PUT_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Не удалось обновить резюме',
  'ERR_NOT_FOUND': 'Резюме не найдено'
};

const SUMMARY_DELETE_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Не удалось удалить резюме',
  'ERR_NOT_FOUND': 'Резюме не найдено'
};

const SUMMARY_LIST_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Ничего не найдено',
  'ERR_NOT_FOUND': 'Ничего не найдено'
};

const SUMMARY_AUDIO_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Не удалось получить аудиозапись',
  'ERR_NOT_FOUND': 'Аудиозапись не найдена'
};

const SUMMARY_FILE_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Не удалось создать и получить файл резюме',
  'ERR_NOT_FOUND': 'Резюме не найдено'
};

export {RECORD_ERRORS, SUMMRY_GET_ERRORS, SUMMRY_PUT_ERRORS, SUMMARY_DELETE_ERRORS, 
  SUMMARY_LIST_ERRORS, SUMMARY_AUDIO_ERRORS, SUMMARY_FILE_ERRORS};
