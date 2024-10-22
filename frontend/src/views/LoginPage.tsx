import { Button, IconButton, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useReducer, useState } from 'react';

import FormHolder from '../components/FormHolder';
import FieldsGroup from '../components/FieldsGroup';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isVisible, toggleVisibility] = useReducer((value) => !value, false);

  return (
    <FormHolder>
      <FieldsGroup>
        <Typography variant='h2'>Вход</Typography>

        <TextField 
          value={email}
          type='email'
          label='Электронная почта'
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
              endAdornment: <IconButton color='primary' onClick={toggleVisibility}>
                              {isVisible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
            }
          }}/>

        <Button variant='containtedSecondary'>Войти</Button>
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
