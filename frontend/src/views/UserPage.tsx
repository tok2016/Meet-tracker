import { Avatar, Button, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectUser } from '../store/user/userSlice';
import UserInfoInput from '../components/UserInfoInput';
import { UserRaw } from '../utils/types/User';
import { patchUserChanges } from '../store/user/userThunks';
import { AccountCircle, Logout } from '@mui/icons-material';
const UserPage = () => {
  const {user} = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const sendUpdate = (updatedUser: UserRaw) => {
    dispatch(patchUserChanges(updatedUser));
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
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
            {user.avatar 
              ? <Avatar src={user.avatar}/>
              : <AccountCircle />}
            <div>
              <Typography variant='h3'>{user.firstName} {user.lastName}</Typography>
              <Typography variant='body1'>{user.email}</Typography>
            </div>
          </div>

          <Button variant='transparent' startIcon={<Logout />}>
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
