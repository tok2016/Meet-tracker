import { Button, IconButton, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useReducer, useState } from 'react';

import FormHolder from '../components/FormHolder';
import FieldsGroup from '../components/FieldsGroup';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { postUserData } from '../store/user/userThunks';
import { UserRaw } from '../types/User';
import { selectUser } from '../store/user/userSlice';
import { postNewUser } from '../store/admin/adminThunks';
import { selectAdminData } from '../store/admin/adminSlice';
import userSchema from '../schemas/userSchema';
import { isValidationError } from '../schemas/validationError';
import { UserValidationError } from '../types/UserValidationError';

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

  const [isVisible, toggleVisibility] = useReducer((value) => !value, false);
  const [error, setError] = useState<UserValidationError>(defaultUserData);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {user: originalUser} = useAppSelector(selectUser);
  const {user: anotherUser} = useAppSelector(selectAdminData);

  const arePasswordsTheSame = repeatedPassword === userData.password;
  const disabled = useMemo(() => Object.values(error).every((err) => !err), [error]);

  const formUser = (user: UserRaw) => {
    if(isForAdmin) {
      dispatch(postNewUser(user));
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
    if(isForAdmin) {
      if(anotherUser.username) {
        navigate(`/account/admin/users/${anotherUser.id}`);
      }
    } else {
      if(originalUser.username) {
        navigate('/login');
      }
    }
  }, [originalUser.username, anotherUser.username]);

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

          <TextField 
            value={userData.password}
            type={isVisible ? 'text' : 'password'}
            label='Пароль'
            required
            helperText={error.password}
            onChange={(evt) => validateValue({password: evt.target.value})}
            slotProps={{
              input: {
                endAdornment: <IconButton color='secondary' onClick={toggleVisibility}>
                                {isVisible ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
              }
            }}/>

          <TextField 
            value={repeatedPassword}
            type={isVisible ? 'text' : 'password'}
            label='Повторите пароль'
            required
            helperText={arePasswordsTheSame ? '' : 'Пароли не совпадают'}
            onChange={(evt) => setRepeatedPassword(evt.target.value)}
            slotProps={{
              input: {
                endAdornment: <IconButton color='secondary' onClick={toggleVisibility}>
                                {isVisible ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
              }
            }}/>

          <Button 
            variant='containtedSecondary'
            disabled={disabled || !arePasswordsTheSame}
            onClick={() => formUser(userData)}>
              Зарегистрироваться
          </Button>
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
