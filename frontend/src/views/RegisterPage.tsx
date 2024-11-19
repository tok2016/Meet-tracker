import { Button, IconButton, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';

import FormHolder from '../components/FormHolder';
import FieldsGroup from '../components/FieldsGroup';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { postUserData } from '../store/user/userThunks';
import { UserRaw } from '../utils/types/User';
import { selectUser } from '../store/user/userSlice';
import { postNewUser } from '../store/admin/adminThunks';
import { selectAdminData } from '../store/admin/adminSlice';

const RegisterPage = ({isForAdmin=false}: {isForAdmin?: boolean}) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');

  const [isVisible, toggleVisibility] = useReducer((value) => !value, false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {user: originalUser} = useAppSelector(selectUser);
  const {user: anotherUser} = useAppSelector(selectAdminData);

  const formUser = () => {
    const newUser: UserRaw = {
      username,
      password,
      email,
      firstName,
      lastName,
      avatar: ''
    };

    if(isForAdmin) {
      dispatch(postNewUser(newUser));
    } else {
      dispatch(postUserData(newUser));
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
  });

  return (
    <FormHolder isForAdmin={isForAdmin}>
      <div>
        <Typography variant='h2' marginBottom='3.5vh'>Регистрация</Typography>

        <FieldsGroup>
          <TextField 
            value={username}
            type='text'
            label='Логин'
            autoComplete='off'
            required
            onChange={(evt) => setUsername(evt.target.value)}/>

          <TextField 
            value={email}
            type='email'
            label='Электронная почта'
            autoComplete='off'
            required
            onChange={(evt) => setEmail(evt.target.value)}/>

          <TextField 
            value={firstName}
            type='text'
            label='Имя'
            autoComplete='off'
            required
            onChange={(evt) => setFirstName(evt.target.value)}/>

          <TextField 
            value={lastName}
            type='text'
            label='Фамилия'
            autoComplete='off'
            onChange={(evt) => setLastName(evt.target.value)}/>

          <TextField 
            value={password}
            type={isVisible ? 'text' : 'password'}
            label='Пароль'
            required
            onChange={(evt) => setPassword(evt.target.value)}
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
            disabled={!username || !email || !password || !repeatedPassword || !firstName}
            onClick={formUser}>
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
