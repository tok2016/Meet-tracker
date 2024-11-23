import { Button, Stack, Typography } from '@mui/material';
import { Delete, Logout } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectUser } from '../store/user/userSlice';
import UserInfoInput from '../components/UserInfoInput';
import { User } from '../types/User';
import { patchCurrentUser, postLogout } from '../store/user/userThunks';
import AvatarUploadInput from '../components/AvatarUploadInput';
import { selectAdminData } from '../store/admin/adminSlice';
import { deleteUserById, getUserAvatar, getUserById, patchUserById } from '../store/admin/adminThunks';


const UserPage = ({isForAdmin=false}: {isForAdmin?: boolean}) => {
  const {id} = useParams();
  const parsedId = parseInt(id ?? '');

  const navigate = useNavigate();

  const {user: originalUser} = useAppSelector(selectUser);
  const {user: anotherUser} = useAppSelector(selectAdminData);
  const dispatch = useAppDispatch();

  const user = isForAdmin ? anotherUser : originalUser;
  const userDate = new Date(user.registrationDate).toLocaleDateString();

  const disabled = isForAdmin && user.isAdmin;

  const sendUpdate = (updatedUser: User) => {
    if(isForAdmin) {
      const parsedId = parseInt(id ?? '');
      dispatch(patchUserById({...updatedUser, id: parsedId})).then(() => navigate('/account/admin/users'));
    } else {
      dispatch(patchCurrentUser(updatedUser));
    }
  };

  const logout = () => {
    dispatch(postLogout()).then(() => navigate('/login'));
  };

  const deleteUser = () => {
    dispatch(deleteUserById(parsedId));
  };

  useEffect(() => {
    if(isForAdmin && parsedId) {
      dispatch(getUserById(parsedId));
      dispatch(getUserAvatar(parsedId));
    }
  }, [parsedId, dispatch]);

  return (
    <>
      <Typography variant='h2'>Настройки</Typography>

      <div style={{
        width: '60%',
        margin: '4.5vh auto 0'
      }}>
        <Stack
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          marginBottom='20px'>
            <Stack
              display='flex'
              flexDirection='row'
              alignItems='center'
              gap='10px'>
                <AvatarUploadInput 
                  sx={{width: '2.5em', height: '2.5em'}} 
                  defaultAvatar={user.avatar}
                  isForAdmin={isForAdmin}
                  disabled={disabled}
                  userId={parsedId} />
                <div>
                  <Typography variant='h4'>{user.firstName} {user.lastName}</Typography>
                  <Typography variant='body1'>Дата регистрации: {userDate}</Typography>
                </div>
            </Stack>

            {isForAdmin 
              ? <Button 
                  variant='danger' 
                  startIcon={<Delete />} 
                  onClick={deleteUser}
                  style={{
                    display: user.isAdmin ? 'none' : 'inherit'
                  }}>
                    Удалить
                </Button>
              : <Button 
                  variant='danger' 
                  startIcon={<Logout />} 
                  onClick={logout}>
                    Выйти
                </Button>}
        </Stack>

        <UserInfoInput 
          type='text' 
          readOnly 
          label='Логин'
          defaultValue={user.username}
          disabled={disabled}
          apply={() => {}}
          />

        <UserInfoInput
          type='text'
          label='Имя'
          defaultValue={user.firstName}
          disabled={disabled}
          apply={(update) => sendUpdate({...user, firstName: update})} />

        <UserInfoInput
          type='text'
          label='Фамилия'
          defaultValue={user.lastName}
          disabled={disabled}
          apply={(update) => sendUpdate({...user, lastName: update})} />

        <UserInfoInput
          type='email'
          label='Электронная почта'
          defaultValue={user.email}
          disabled={disabled}
          apply={(update) => sendUpdate({...user, email: update})} />

        <UserInfoInput 
          type='password'
          label='Пароль'
          defaultValue={user.password}
          disabled={disabled}
          apply={() => {}}/>
      </div>
    </>
  );
};

export default UserPage;
