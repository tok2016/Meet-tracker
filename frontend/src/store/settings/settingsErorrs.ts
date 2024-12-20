import ErrorMessage from '../../types/ErrorMessage';
import { DefaultErrors } from '../../utils/Error';

const POST_LLM_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Выбранная конфигурация LLM недоступна',
  'ERR_NOT_FOUND': 'Не удалось найти некоторые данные'
};

const GET_LLM_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_NOT_FOUND': 'Данные о текущей конфигурации LLM не найдены'
};

const GET_LLMS_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_NOT_FOUND': 'Данные о доступных LLM не найдены'
};

const POST_STT_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Выбранные настройки конфигурации STT-модели недоступны',
  'ERR_NOT_FOUND': 'Не удалось найти некоторые данные'
};

const GET_STT_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_NOT_FOUND': 'Данные о текущей конфигурации STT-модели не найдены'
};

const POST_EMAIL_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Данные настройки интеграции с электронной почтой не поддерживаются',
  'ERR_NOT_FOUND': 'Не удалось найти некоторые данные'
};

const GET_EMAIL_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_NOT_FOUND': 'Данные о текущих настройках интеграции с электронной почтой не найдены'
};

export {POST_LLM_ERRORS, GET_LLM_ERRORS, GET_LLMS_ERRORS, POST_STT_ERRORS, GET_STT_ERRORS, POST_EMAIL_ERRORS, GET_EMAIL_ERRORS};
