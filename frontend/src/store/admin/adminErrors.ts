import ErrorMessage from '../../types/ErrorMessage';
import { DefaultErrors } from '../../utils/Error';

const GET_USERS_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Ничего не найдено',
  'ERR_NOT_FOUND': 'Ничего не найдено'
};

const DELETE_USER_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Не удалось удалить пользователя',
  'ERR_NOT_FOUND': 'Пользователь не найден'
};

const ARCHIVE_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Не удалось архивировать аудиозапись',
  'ERR_NOT_FOUND': 'Аудиозапись не найдена'
};

const DELETE_RECORD_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Не удалось удалить данную аудиозапись',
  'ERR_NOT_FOUND': 'Аудиозапись не найдена'
};

export {GET_USERS_ERRORS, DELETE_USER_ERRORS, ARCHIVE_ERRORS, DELETE_RECORD_ERRORS};
