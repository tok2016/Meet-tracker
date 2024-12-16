import ErrorMessage from '../types/ErrorMessage';

const DefaultErrors: ErrorMessage = {
  'ERR_BAD_REQUEST': 'Данные заполнены неверно',
  'ERR_UNAUTHORIZED': 'Вы не авторизованы. Необходимо совершить повторный вход в систему',
  'ERR_FORBIDDEN': 'Доступ запрещён',
  'ERR_NOT_FOUND': 'Учётная запись не найдена',
  'ERR_METHOD_NOT_ALLOWED': 'Данное действие не поддерживается',
  'ERR_REQUEST_TIMEOUT': 'Время ожидания истекло. Попробуйте снова',
  'ERR_INTERNET_SERVER_ERROR': 'Ошибка на стороне сервера',
  'ERR_BAD_GATEAWAY': 'Не удалось установить соединение с сервером'
};

const getErrorMessage = (errorMessageObject: ErrorMessage, statusCode: string | undefined): string => {
  if(!statusCode) {
    return errorMessageObject['ERR_INTERNET_SERVER_ERROR'];
  }

  const message = errorMessageObject[statusCode as unknown as keyof ErrorMessage];
  return message ?? errorMessageObject['ERR_INTERNET_SERVER_ERROR'];
};

export {getErrorMessage, DefaultErrors};
