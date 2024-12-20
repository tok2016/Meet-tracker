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
import ButtonContent from '../components/ButtonContent';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const {auth, user, status, loginError} = useAppSelector(selectUser);

  const authorize = () => {
    const login: UserLogin = {
      email,
      password
    };

    dispatch(postLogin(login));
  };

  useEffect(() => {
    if(auth.token) {
      if(!user.username) {
        dispatch(getCurrentUser());
        dispatch(getCurrentUserAvatar());
      }
    }
  }, [auth.token, user.username]);

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
            <ButtonContent content='Войти' status={status} />
        </Button>

        <Typography variant='error'>{loginError}</Typography>
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
