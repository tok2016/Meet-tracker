import ErrorMessage from '../../types/ErrorMessage';
import { DefaultErrors } from '../../utils/Error';

const LOGIN_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_UNAUTHORIZED': 'Неправильная электронная почта или пароль'
};

const REGISTER_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_UNAUTHORIZED': 'На данный момент Вы не можете создать новую учётную запись',
  'ERR_NOT_FOUND': 'Не удалось найти некоторые данные'
};

const GET_USER_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Не удалось получить данные об учётной записи'
};

const PATCH_USER_ERRORS: ErrorMessage = {
  ...DefaultErrors
};

const USER_PASSWORD_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Данный пароль нельзя использовать'
};

const AVATAR_POST_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Данный формат изображения не поддерживается'
};

const AVATAR_GET_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Не удалось получить изображение',
  'ERR_NOT_FOUND': 'Изображение не найдено'
};

export {LOGIN_ERRORS, REGISTER_ERRORS, AVATAR_POST_ERRORS, AVATAR_GET_ERRORS, 
  GET_USER_ERRORS, PATCH_USER_ERRORS, USER_PASSWORD_ERRORS};
