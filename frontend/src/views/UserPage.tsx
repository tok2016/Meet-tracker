import { Avatar, Button, Typography } from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectUser } from '../store/user/userSlice';
import UserInfoInput from '../components/UserInfoInput';
import { User, UserRaw } from '../utils/types/User';
import { patchUserChanges, postLogout } from '../store/user/userThunks';

const UserPage = () => {
  const navigate = useNavigate();

  //const {user} = useAppSelector(selectUser);
  const user: User = {
    id: 1,
    username: 'Musya',
    firstName: 'Муся',
    lastName: 'Беспородная',
    email: 'musyathebest@somemail.com',
    password: '11111111111',
    isAdmin: false,
    registrationDate: new Date().toISOString(),
    avatar: ''
  }
  const dispatch = useAppDispatch();

  const userDate = new Date(user.registrationDate).toLocaleDateString();

  const sendUpdate = (updatedUser: UserRaw) => {
    dispatch(patchUserChanges(updatedUser));
  };

  const logout = () => {
    dispatch(postLogout()).then(() => navigate('/login'));
  };

  return (
    <>
      <Typography variant='h2'>Настройки</Typography>

      <div style={{
        width: '60%',
        margin: '4.5vh auto 0'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            {user.avatar 
              ? <Avatar src={user.avatar} sx={{width: '2.5em', height: '2.5em'}} />
              : <AccountCircle sx={{width: '2.5em', height: '2.5em'}} />}
            <div>
              <Typography variant='h4'>{user.firstName} {user.lastName}</Typography>
              <Typography variant='body1'>Дата регистрации: {userDate}</Typography>
            </div>
          </div>

          <Button variant='danger' startIcon={<Logout />} onClick={logout}>
            Выйти
          </Button>
        </div>

        <UserInfoInput 
          type='text' 
          readOnly 
          label='Логин'
          defaultValue={user.username}
          apply={() => {}}
          />

        <UserInfoInput
          type='text'
          label='Имя'
          defaultValue={user.firstName}
          apply={(update) => sendUpdate({...user, firstName: update})} />

        <UserInfoInput
          type='text'
          label='Фамилия'
          defaultValue={user.lastName}
          apply={(update) => sendUpdate({...user, lastName: update})} />

        <UserInfoInput
          type='email'
          label='Электронная почта'
          defaultValue={user.email}
          apply={(update) => sendUpdate({...user, email: update})} />

        <UserInfoInput 
          type='password'
          label='Пароль'
          defaultValue={user.password}
          apply={() => {}}/>
      </div>
    </>
  );
};

export default UserPage;
