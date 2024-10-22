import { Button, IconButton, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useReducer, useState } from 'react';

import FormHolder from '../components/FormHolder';
import FieldsGroup from '../components/FieldsGroup';

const RegisterPage = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');

  const [isVisible, toggleVisibility] = useReducer((value) => !value, false);

  return (
    <FormHolder>
      <div>
        <Typography variant='h2' marginBottom='3.5vh'>Регистрация</Typography>

        <FieldsGroup>
          <TextField 
            value={username}
            type='text'
            label='Логин'
            required
            onChange={(evt) => setUsername(evt.target.value)}/>

          <TextField 
            value={email}
            type='email'
            label='Электронная почта'
            required
            onChange={(evt) => setEmail(evt.target.value)}/>

          <TextField 
            value={firstName}
            type='text'
            label='Имя'
            required
            onChange={(evt) => setFirstName(evt.target.value)}/>

          <TextField 
            value={lastName}
            type='text'
            label='Фамилия'
            onChange={(evt) => setLastName(evt.target.value)}/>

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

          <TextField 
            value={repeatedPassword}
            type={isVisible ? 'text' : 'password'}
            label='Повторите пароль'
            required
            onChange={(evt) => setRepeatedPassword(evt.target.value)}
            slotProps={{
              input: {
                endAdornment: <IconButton color='primary' onClick={toggleVisibility}>
                                {isVisible ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
              }
            }}/>

          <Button variant='containtedSecondary'>Зарегистрироваться</Button>
        </FieldsGroup>
      </div>

      <div>
        <Typography variant='subtitle2' marginBottom={'0.5vh'}>У вас уже есть учетная запись?</Typography>
        <Link to='/login'>
          <Typography variant='subtitle1'>Войти</Typography>
        </Link>
      </div>
    </FormHolder>
  );
};

export default RegisterPage;
