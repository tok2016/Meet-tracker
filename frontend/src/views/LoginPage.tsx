import { Button, IconButton, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';

import FormHolder from '../components/FormHolder';
import FieldsGroup from '../components/FieldsGroup';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectUser } from '../store/user/userSlice';
import { UserLogin } from '../utils/types/User';
import { getCurrentUser, getUserAvatar, postLogin } from '../store/user/userThunks';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isVisible, toggleVisibility] = useReducer((value) => !value, false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {auth, user, status} = useAppSelector(selectUser);

  const authorize = () => {
    const login: UserLogin = {
      email,
      password
    };

    dispatch(postLogin(login));
  };

  useEffect(() => {
    if(auth.token && status !== 'error') {
      if(user.username) {
        navigate(`/account/users/${user.username}`);
      } else {
        dispatch(getCurrentUser());
        dispatch(getUserAvatar());
      }
    }
  });

  return (
    <FormHolder>
      <FieldsGroup>
        <Typography variant='h2'>Вход</Typography>

        <TextField 
          value={email}
          type='email'
          label='Электронная почта'
          autoComplete='off'
          required
          onChange={(evt) => setEmail(evt.target.value)}/>

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

        <Button
          onClick={authorize} 
          disabled={!email || !password}
          variant='containtedSecondary'>
            Войти
        </Button>
      </FieldsGroup>

      <div>
        <Typography variant='subtitle2' marginBottom={'0.5vh'}>У вас нет учетной записи?</Typography>
        <Link to='/register'>
          <Typography variant='subtitle1'>Зарегистрироваться</Typography>
        </Link>
      </div>
    </FormHolder>
  );
};

export default LoginPage;
