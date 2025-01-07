import { useEffect, useReducer } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import UserInfoInput from './UserInfoInput';
import { User } from '../../types/User';
import { patchCurrentUser } from '../../store/user/userThunks';
import { getUserAvatar, getUserById, patchUserById } from '../../store/admin/adminThunks';
import PasswordMenu from './PasswordMenu';
import UserInfo from './UserInfo';
import { Typography } from '@mui/material';
import { Status } from '../../types/Status';

const UserProfileForm = ({isForAdmin, user, disabled, id, status, error}: {isForAdmin: boolean, user: User, disabled: boolean, id: number, status: Status, error?: string}) => {
  const dispatch = useAppDispatch();

  const [isOpened, toggleOpen] = useReducer((value) => !value, false);

  const sendUpdate = async (updatedUser: User) => {
    if(isForAdmin) {
      await dispatch(patchUserById({...updatedUser, id}));
    } else {
      await dispatch(patchCurrentUser(updatedUser));
    }

    if(isOpened) {
      toggleOpen();
    }
  };

  useEffect(() => {
    if(isForAdmin && id) {
      dispatch(getUserById(id));
      dispatch(getUserAvatar(id));
    }
  }, [id, dispatch]);

  return (
    <>
      <UserInfo 
        id={id} 
        user={user} 
        isForAdmin={isForAdmin}
        status={status} 
        disabled={disabled} />

      <Typography variant='error'>{error}</Typography>

      <UserInfoInput 
        path='username'
        type='text' 
        status={status}
        readOnly 
        label='Логин'
        defaultValue={user.username}
        disabled={disabled}
        apply={() => {}} />

      <UserInfoInput
        path='firstName'
        type='text'
        status={status}
        label='Имя'
        defaultValue={user.firstName}
        disabled={disabled}
        apply={(update) => sendUpdate({...user, firstName: update})} />

      <UserInfoInput
        path='lastName'
        type='text'
        status={status}
        label='Фамилия'
        defaultValue={user.lastName}
        disabled={disabled}
        apply={(update) => sendUpdate({...user, lastName: update})} />

      <UserInfoInput
        path='email'
        type='email'
        status={status}
        label='Электронная почта'
        defaultValue={user.email}
        disabled={disabled}
        apply={(update) => sendUpdate({...user, email: update})} />

      <UserInfoInput
        path='phoneNumber'
        type='tel'
        status={status}
        label='Номер телефона'
        defaultValue={user.phoneNumber}
        disabled={disabled}
        apply={(update) => sendUpdate({...user, phoneNumber: update})} />

      <UserInfoInput 
        path='password'
        type='password'
        status={status}
        label='Пароль'
        defaultValue={user.password}
        disabled={disabled}
        apply={() => {}}
        openMenu={toggleOpen}/>

      <PasswordMenu 
        userId={id}
        isForAdmin={isForAdmin}
        isOpened={isOpened} 
        status={status}
        toggleOpen={toggleOpen} />
    </>
  );
};

export default UserProfileForm;
