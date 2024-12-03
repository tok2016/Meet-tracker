import { Button, Stack, Typography } from '@mui/material';
import { Delete, Logout } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useReducer } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectUser } from '../store/user/userSlice';
import UserInfoInput from '../components/UserInfoInput';
import { User } from '../types/User';
import { patchCurrentUser, postLogout } from '../store/user/userThunks';
import AvatarUploadInput from '../components/AvatarUploadInput';
import { selectAdminData } from '../store/admin/adminSlice';
import { deleteUserById, getUserAvatar, getUserById, patchUserById } from '../store/admin/adminThunks';
import { getLocaleString } from '../utils/utils';
import PasswordMenu from '../components/PasswordMenu';


const UserPage = ({isForAdmin=false}: {isForAdmin?: boolean}) => {
  const {id} = useParams();
  const parsedId = parseInt(id ?? '');

  const navigate = useNavigate();

  const {user: originalUser, status: originalStatus} = useAppSelector(selectUser);
  const {user: anotherUser, status: anotherStatus} = useAppSelector(selectAdminData);
  const dispatch = useAppDispatch();

  const [isOpened, toggleOpen] = useReducer((value) => !value, false);

  const user = isForAdmin ? anotherUser : originalUser;
  const userDate = getLocaleString((new Date()).toISOString());

  const disabled = isForAdmin && user.isAdmin;

  const sendUpdate = async (updatedUser: User) => {
    if(isForAdmin) {
      await dispatch(patchUserById({...updatedUser, id: parsedId}));
    } else {
      await dispatch(patchCurrentUser(updatedUser));
    }

    if(isOpened) {
      toggleOpen();
    }
  };

  const logout = () => {
    dispatch(postLogout()).then(() => navigate('/login'));
  };

  const deleteUser = () => {
    dispatch(deleteUserById(parsedId)).then(() => {
      if(isForAdmin) {
        navigate('/account/admin/users')
      }
    });
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
          path='username'
          type='text' 
          readOnly 
          label='Логин'
          defaultValue={user.username}
          disabled={disabled}
          apply={() => {}}
          />

        <UserInfoInput
          path='firstName'
          type='text'
          label='Имя'
          defaultValue={user.firstName}
          disabled={disabled}
          apply={(update) => sendUpdate({...user, firstName: update})} />

        <UserInfoInput
          path='lastName'
          type='text'
          label='Фамилия'
          defaultValue={user.lastName}
          disabled={disabled}
          apply={(update) => sendUpdate({...user, lastName: update})} />

        <UserInfoInput
          path='email'
          type='email'
          label='Электронная почта'
          defaultValue={user.email}
          disabled={disabled}
          apply={(update) => sendUpdate({...user, email: update})} />

        <UserInfoInput 
          path='password'
          type='password'
          label='Пароль'
          defaultValue={user.password}
          disabled={disabled}
          apply={() => {}}
          openMenu={toggleOpen}/>

        <PasswordMenu 
          userId={parsedId}
          isForAdmin={isForAdmin}
          isOpened={isOpened} 
          status={isForAdmin ? anotherStatus : originalStatus}
          toggleOpen={toggleOpen} />
      </div>
    </>
  );
};

export default UserPage;
