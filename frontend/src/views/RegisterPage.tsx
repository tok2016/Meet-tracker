import { Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import FormHolder from '../components/FormHolder';
import FieldsGroup from '../components/FieldsGroup';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { postUserData } from '../store/user/userThunks';
import { isUser, UserRaw } from '../types/User';
import { selectUser } from '../store/user/userSlice';
import { postNewUser } from '../store/admin/adminThunks';
import userSchema from '../schemas/userSchema';
import { isValidationError } from '../schemas/validationError';
import { UserValidationError } from '../types/UserValidationError';
import PasswordField from '../components/user/PasswordField';
import ButtonContent from '../components/ButtonContent';

const defaultUserData: UserRaw = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  avatar: ''
};

const RegisterPage = ({isForAdmin=false}: {isForAdmin?: boolean}) => {
  const [userData, setUserData] = useState<UserRaw>(defaultUserData);
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');
  const [error, setError] = useState<UserValidationError>(defaultUserData);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {user: originalUser, registerError, status} = useAppSelector(selectUser);

  const arePasswordsTheSame = repeatedPassword === userData.password;
  const isCorrect = useMemo(() => Object.values(error).every((err) => !err), [error]);

  const formUser = (user: UserRaw) => {
    if(isForAdmin) {
      dispatch(postNewUser(user)).then((action) => {
        if(isUser(action.payload)) {
          navigate(`/account/admin/users/${action.payload.id}`)
        }
      });
    } else {
      dispatch(postUserData(user));
    }
  };

  const validateValue = (obj: Partial<UserRaw>) => {
    const path = Object.keys(obj)[0];

    try {
      const validated = userSchema.validateSyncAt(path, obj);

      setUserData(data => ({...data, [path]: validated}));
      setError(data => ({...data, [path]: undefined}));
    } catch(error) {
      if(isValidationError(error)) {
        setUserData(data => ({...data, ...obj}));
        setError(data => ({...data, [path]: error.message}));
      }
    }
  };

  useEffect(() => {
    if(!isForAdmin && originalUser.username) {
      navigate('/login');
    }
  }, [originalUser.username]);

  useEffect(() => {
    const errors: ReturnType<typeof Object.entries> = [];
    Object.entries(userData).forEach((entry) => {
      try {
        userSchema.validateSyncAt(entry[0], entry[1]);
      } catch(error) {
        if(isValidationError(error)) {
          errors.push([entry[0], error.message]);
        }
      }
    });

    setError(Object.fromEntries(errors) as UserValidationError);
  }, [])

  return (
    <FormHolder isForAdmin={isForAdmin}>
      <div>
        <Typography variant='h2' marginBottom='3.5vh'>Регистрация</Typography>

        <FieldsGroup>
          <TextField 
            value={userData.username}
            type='text'
            label='Логин'
            autoComplete='off'
            required
            helperText={error.username}
            onChange={(evt) => validateValue({username: evt.target.value})}/>

          <TextField 
            value={userData.email}
            type='email'
            label='Электронная почта'
            autoComplete='off'
            required
            helperText={error.email}
            onChange={(evt) => validateValue({email: evt.target.value})}/>

          <TextField 
            value={userData.firstName}
            type='text'
            label='Имя'
            autoComplete='off'
            required
            helperText={error.firstName}
            onChange={(evt) => validateValue({firstName: evt.target.value})}/>

          <TextField 
            value={userData.lastName}
            type='text'
            label='Фамилия'
            autoComplete='off'
            helperText={error.lastName}
            onChange={(evt) => validateValue({lastName: evt.target.value})}/>

          <PasswordField
            value={userData.password}
            errorMessage={error.password}
            onChange={(evt) => validateValue({password: evt.target.value})} />

          <PasswordField
            value={repeatedPassword}
            label='Повторите пароль'
            errorMessage={arePasswordsTheSame ? undefined : 'Пароли не совпадают'}
            onChange={(evt) => setRepeatedPassword(evt.target.value)} />

          <Button 
            variant='containtedSecondary'
            disabled={!isCorrect || !arePasswordsTheSame}
            onClick={() => formUser(userData)}>
              <ButtonContent content={isForAdmin ? 'Зарегистрировать' : 'Зарегистрироваться'} status={status} />
          </Button>

          <Typography variant='error'>{registerError}</Typography>
        </FieldsGroup>
      </div>

      <div style={{
        display: isForAdmin ? 'none' : 'block'
      }}>
        <Typography variant='subtitle2' marginBottom={'0.5vh'}>У вас уже есть учетная запись?</Typography>
        <Link to='/login'>
          <Typography variant='subtitle1'>Войти</Typography>
        </Link>
      </div>
    </FormHolder>
  );
};

export default RegisterPage;
