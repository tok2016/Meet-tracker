import ErrorMessage from '../../types/ErrorMessage';
import { DefaultErrors } from '../../utils/Error';

const POST_PALETTE_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_NOT_FOUND': 'Не удалось найти некоторые данные'
};

const POST_LOGO_ERRORS: ErrorMessage = {
  ...DefaultErrors,
  'ERR_BAD_REQUEST': 'Данный формат изображения для логотипа не подходит',
  'ERR_NOT_FOUND': 'Не удалось найти некоторые данные'
};

export {POST_PALETTE_ERRORS, POST_LOGO_ERRORS};
