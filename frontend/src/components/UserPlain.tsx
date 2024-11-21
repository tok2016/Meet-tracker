import { MenuItem, Typography } from '@mui/material';
//import { AccountCircle } from '@mui/icons-material';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { User } from '../utils/types/User';
import ItemPlain from './ItemPlain';
import PlainMenu from './PlainMenu';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { deleteUserById } from '../store/admin/adminThunks';
import { getLocaleString } from '../utils/utils';
//import { TextColors } from '../utils/Colors';

const RawUserPlain = ({user, onDelete}: {user: User, onDelete: () => void}) => {
  const dispatch = useAppDispatch();

  const date = getLocaleString(user.registrationDate);

  /*const avatarSx: SxProps<Theme> = {
    width: '1.2em',
    height: '1.2em',
    color: TextColors.main
  };*/

  const deleteUser = () => {
    dispatch(deleteUserById(user.id)).then(() => onDelete());
  };

  return (
    <ItemPlain>
      <div style={{
        display: 'grid',
        width: '100%',
        gridTemplateColumns: '5fr 6fr 8fr 3fr 5fr 1fr',
        columnGap: '3vw'
      }}>
      {/*user.avatar 
        ? <Avatar src={user.avatar} sx={avatarSx} />
        : <AccountCircle sx={avatarSx} />*/}

      <Link to={`/account/admin/users/${user.id}`} style={{ overflow: 'hidden' }}>
        <Typography variant='h4' overflow='hidden' textOverflow='ellipsis'>
          {user.username}
        </Typography>
      </Link>
      
      <Typography variant='h4' overflow='hidden' textOverflow='ellipsis'>
        {user.firstName} {user.lastName}
      </Typography>

      <Typography variant='h4' overflow='hidden' textOverflow='ellipsis'>
        {user.email}
      </Typography>

      <Typography variant='h3Normal' textAlign='left' overflow='hidden' textOverflow='ellipsis'>
        {date}
      </Typography>

      <Typography variant='h3Normal' textAlign='left' overflow='hidden' textOverflow='ellipsis'>
        {user.isAdmin ? 'Администратор' : 'Пользователь'}
      </Typography>

      <PlainMenu hidden={false}>
        <MenuItem 
          sx={{
            display: user.isAdmin ? 'none' : 'inherit'
          }} 
          onClick={deleteUser}>
            Удалить пользователя
        </MenuItem>
        <MenuItem
          sx={{
            display: user.isAdmin ? 'none' : 'inherit'
          }}>
            Назначить администратором
        </MenuItem>
        <MenuItem 
          sx={{
            display: user.isAdmin ? 'inherit' : 'none'
          }}>
            Разжаловать права
        </MenuItem>
      </PlainMenu>
      </div>
    </ItemPlain>
  );
};

const UserPlain = memo(RawUserPlain);
export default UserPlain;
