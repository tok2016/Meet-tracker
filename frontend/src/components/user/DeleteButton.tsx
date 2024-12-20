import { Delete, Logout } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { postLogout } from '../../store/user/userThunks';
import { deleteUserById } from '../../store/admin/adminThunks';
import { Status } from '../../types/Status';

const DeleteUserButton = ({userId, isForAdmin, isUserAdmin, status, hidden}: {userId: number, isForAdmin: boolean, isUserAdmin: boolean, status: Status, hidden: boolean}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(postLogout()).then(() => navigate('/login'));
  };

  const deleteUser = () => {
    dispatch(deleteUserById(userId)).then(() => {
      if(isForAdmin) {
        navigate('/account/admin/users')
      }
    });
  };

  if(hidden) {
    return;
  } else if(isForAdmin) {
    <Button 
      variant='danger' 
      startIcon={status === 'pending' ? undefined : <Delete />} 
      onClick={deleteUser}
      style={{
        display: isUserAdmin ? 'none' : 'inherit'
      }}>
        {status === 'pending' ? <CircularProgress color='error' /> : 'Удалить'}
    </Button>
  }

  return (
    <Button 
      variant='danger' 
      startIcon={status === 'pending' ? undefined : <Logout />} 
      onClick={logout}>
        {status === 'pending' ? <CircularProgress color='error' /> : 'Выйти'}
    </Button>
  )
};

export default DeleteUserButton;
