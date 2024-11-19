import { Avatar, MenuItem, SxProps, Theme, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { User } from '../utils/types/User';
import ItemPlain from './ItemPlain';
import PlainMenu from './PlainMenu';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { deleteUserById } from '../store/admin/adminThunks';
import { getLocaleString } from '../utils/utils';
import { TextColors } from '../utils/Colors';

const RawUserPlain = ({user, onDelete}: {user: User, onDelete: () => void}) => {
  const dispatch = useAppDispatch();

  const date = getLocaleString(user.registrationDate);

  const avatarSx: SxProps<Theme> = {
    width: '1.2em',
    height: '1.2em',
    color: TextColors.main
  };

  const deleteUser = () => {
    dispatch(deleteUserById(user.id)).then(() => onDelete());
  };

  return (
    <ItemPlain>
      {user.avatar 
        ? <Avatar src={user.avatar} sx={avatarSx} />
        : <AccountCircle sx={avatarSx} />}

      <Link to={`/account/admin/users/${user.id}`}>
        <Typography variant='h3'>
          {user.username}
        </Typography>
      </Link>
      
      <Typography variant='h3'>
        {user.firstName} {user.lastName}
      </Typography>

      <Typography variant='h3'>
        {user.email}
      </Typography>

      <Typography>
        {date}
      </Typography>

      <Typography>
        {user.isAdmin ? 'Администратор' : 'Пользователь'}
      </Typography>

      <PlainMenu hidden={user.isAdmin}>
        <MenuItem onClick={deleteUser}>Удалить пользователя</MenuItem>
      </PlainMenu>
    </ItemPlain>
  );
};

const UserPlain = memo(RawUserPlain);
export default UserPlain;
