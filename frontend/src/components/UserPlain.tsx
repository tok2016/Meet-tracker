
import { Typography } from '@mui/material';
import { User } from '../utils/types/User';
import AvatarUploadInput from './AvatarUploadInput';
import ItemPlain from './ItemPlain';

const UserPlain = ({user}: {user: User}) => {
  const date = new Date(user.registrationDate);

  return (
    <ItemPlain>
      <AvatarUploadInput sx={{width: '2em', height: '2em'}} defaultAvatar={user.avatar} />

      <Typography variant='h3'>
        {user.username}
      </Typography>
      
      <Typography variant='h3'>
        {user.firstName} {user.lastName}
      </Typography>

      <Typography variant='h3'>
        {user.email}
      </Typography>

      <Typography>
        {date.toLocaleDateString()}
      </Typography>

      <Typography>
        {user.isAdmin ? 'Администратор' : 'Пользователь'}
      </Typography>
    </ItemPlain>
  );
};

export default UserPlain;
