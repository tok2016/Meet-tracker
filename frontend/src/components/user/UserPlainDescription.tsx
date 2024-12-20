import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import UserPlainMenu from './UserPlainMenu';
import { User } from '../../types/User';

type UserPlainDescProps = {
  user: User,
  date: string,
  downMedium: boolean,
  medium: boolean,
  onDelete: () => void
};

const UserPlainDescription = ({user, date, downMedium, medium, onDelete}: UserPlainDescProps) => (
  medium 
  ? <>
      <div style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '5fr 4fr',
        columnGap: '4vw'
      }}>
        <Typography variant='h4' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
          {user.firstName} {user.lastName}
        </Typography>

        <Typography variant='h4' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' textAlign='right'>
            {date}
        </Typography>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        position: 'relative'
      }}>
        <Link to={`/account/admin/users/${user.id}`} style={{ overflow: 'hidden' }}>
          <Typography variant='h4' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
            {user.username}
          </Typography>
        </Link>
        
        {downMedium
          ? <UserPlainMenu user={user} onDelete={onDelete} />
          : <></>}
      </div>

      <div style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '5fr 4fr',
        columnGap: '4vw'
      }}>
        <Typography variant='h4' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
          {user.email}
        </Typography>

        <Typography variant='h4' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' textAlign='right'>
          {user.isAdmin ? 'Администратор' : 'Пользователь'}
        </Typography>
      </div>
    </>
  : <>
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

      <UserPlainMenu user={user} onDelete={onDelete} />
    </>
);

export default UserPlainDescription;
