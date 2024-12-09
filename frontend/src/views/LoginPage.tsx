import { Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import FormHolder from '../components/FormHolder';
import FieldsGroup from '../components/FieldsGroup';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectUser } from '../store/user/userSlice';
import { UserLogin } from '../types/User';
import { getCurrentUser, getCurrentUserAvatar, postLogin } from '../store/user/userThunks';
import PasswordField from '../components/user/PasswordField';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
      if(!user.username) {
        dispatch(getCurrentUser());
        dispatch(getCurrentUserAvatar());
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

        <PasswordField
          value={password}
          errorMessage=''
          onChange={(evt) => setPassword(evt.target.value)} />

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
