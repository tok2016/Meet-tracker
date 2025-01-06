import { object, ObjectSchema, string } from 'yup';
import { UserRaw } from '../types/User';

const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 20;

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 24;

const MAX_NAME_LENGTH = 30;
const MAX_EMAIL_LENGTH = 50;

const REQUIRED_MESSAGE = 'Это поле обязательно для заполнения';

const userSchema: ObjectSchema<UserRaw> = object({
  username: string()
              .required(REQUIRED_MESSAGE)
              .trim()
              .matches(/^[a-zA-Z0-9_]+$/, 'Логин может включать в себя только буквы английского алфавита, цифры и символ _')
              .min(MIN_USERNAME_LENGTH, `Минимальное число символов - ${MIN_USERNAME_LENGTH}`)
              .max(MAX_USERNAME_LENGTH, `Максимальное число символов - ${MAX_USERNAME_LENGTH}`),
  email: string()
          .required(REQUIRED_MESSAGE)
          .trim()
          .email('Неверный формат адреса электронной почты')
          .max(MAX_EMAIL_LENGTH, `Максимальное число символов - ${MAX_EMAIL_LENGTH}`),
  firstName: string()
              .required(REQUIRED_MESSAGE)
              .trim()
              .matches(/^[a-zA-Zа-яА-Я]+$/, 'Имя может включать в себя толбко буквы английского и русского алфавитов')
              .max(MAX_NAME_LENGTH, `Максимальное число символов - ${MAX_NAME_LENGTH}`),
  lastName: string()
              .trim()
              .matches(/^[a-zA-Zа-яА-Я]*$/, 'Фамилия может включать в себя толбко буквы английского и русского алфавитов')
              .max(MAX_NAME_LENGTH, `Максимальное число символов - ${MAX_NAME_LENGTH}`)
              .default(''),
  password: string()
              .required(REQUIRED_MESSAGE)
              .trim()
              .matches(/^[a-zA-Z0-9~!@#$%^&*()_\-+=|:;,.?]+$/, 'Пароль может содержать в себе только буквы английского алфавита, цифры и символы ~!@#$%^&*()_-+=|:;,.?')
              .min(MIN_PASSWORD_LENGTH, `Минимальное число символов - ${MIN_PASSWORD_LENGTH}`)
              .max(MAX_PASSWORD_LENGTH, `Максимальное число символов - ${MAX_PASSWORD_LENGTH}`),
  avatar: string().url().default(''),
  phoneNumber: string()
    .required(REQUIRED_MESSAGE)
    .trim()
    .matches(/^[+0-9]+$/, 'Номер телефона может включать в себя только цифры и символ +')
});

export default userSchema;
