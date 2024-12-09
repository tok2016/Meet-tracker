import { Delete, Logout } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { postLogout } from '../../store/user/userThunks';
import { deleteUserById } from '../../store/admin/adminThunks';

const DeleteUserButton = ({userId, isForAdmin, isUserAdmin, hidden}: {userId: number, isForAdmin: boolean, isUserAdmin: boolean, hidden: boolean}) => {
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
      startIcon={<Delete />} 
      onClick={deleteUser}
      style={{
        display: isUserAdmin ? 'none' : 'inherit'
      }}>
        Удалить
    </Button>
  }

  return (
    <Button 
      variant='danger' 
      startIcon={<Logout />} 
      onClick={logout}>
        Выйти
    </Button>
  )
};

export default DeleteUserButton;
