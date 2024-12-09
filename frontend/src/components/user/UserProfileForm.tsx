import { useEffect, useReducer } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { selectUser } from '../../store/user/userSlice';
import UserInfoInput from './UserInfoInput';
import { User } from '../../types/User';
import { patchCurrentUser } from '../../store/user/userThunks';
import { selectAdminData } from '../../store/admin/adminSlice';
import { getUserAvatar, getUserById, patchUserById } from '../../store/admin/adminThunks';
import PasswordMenu from './PasswordMenu';
import UserInfo from './UserInfo';

const UserProfileForm = ({isForAdmin, user, disabled, id}: {isForAdmin: boolean, user: User, disabled: boolean, id: number}) => {
  const {status: originalStatus} = useAppSelector(selectUser);
  const {status: anotherStatus} = useAppSelector(selectAdminData);
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
        disabled={disabled} />

      <UserInfoInput 
        path='username'
        type='text' 
        readOnly 
        label='Логин'
        defaultValue={user.username}
        disabled={disabled}
        apply={() => {}} />

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
        userId={id}
        isForAdmin={isForAdmin}
        isOpened={isOpened} 
        status={isForAdmin ? anotherStatus : originalStatus}
        toggleOpen={toggleOpen} />
    </>
  );
};

export default UserProfileForm;
