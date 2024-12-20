import { MenuItem } from '@mui/material';

import PlainMenu from '../PlainMenu';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteUserById, patchUserById } from '../../store/admin/adminThunks';
import { User } from '../../types/User';
import useMediaMatch from '../../hooks/useMediaMacth';

type UserPlainMenuProps = {
  user: User
  onDelete: () => void
};

const UserPlainMenu = ({user, onDelete}: UserPlainMenuProps) => {
  const dispatch = useAppDispatch();
  const {small} = useMediaMatch();

  const deleteUser = () => {
    dispatch(deleteUserById(user.id)).then(onDelete);
  };

  const toggleAdmin = () => {
    dispatch(patchUserById({...user, isAdmin: !user.isAdmin})).then(onDelete);
  };

  return (
    <PlainMenu hidden={false} downMedium={small}>
      <MenuItem 
        sx={{
          display: user.isAdmin ? 'none' : 'inherit'
        }} 
        onClick={deleteUser}>
          Удалить пользователя
      </MenuItem>
      <MenuItem
        onClick={toggleAdmin}
        sx={{
          display: user.isAdmin ? 'none' : 'inherit'
        }}>
          Назначить администратором
      </MenuItem>
      <MenuItem 
        onClick={toggleAdmin}
        sx={{
          display: user.isAdmin ? 'inherit' : 'none'
        }}>
          Разжаловать права
      </MenuItem>
    </PlainMenu>
  );
};

export default UserPlainMenu;
