import { Stack } from '@mui/material';
//import { AccountCircle } from '@mui/icons-material';
import { memo } from 'react';

import { User } from '../../types/User';
import ItemPlain from '../ItemPlain';
import { getLocaleString } from '../../utils/utils';
import useMediaMatch from '../../hooks/useMediaMacth';
import UserPlainDescription from './UserPlainDescription';
import { breakpoints } from '../../theme/BasicTypography';

const RawUserPlain = ({user, onDelete}: {user: User, onDelete: () => void}) => {
  const {medium} = useMediaMatch();

  const date = getLocaleString(user.registrationDate);

  /*const avatarSx: SxProps<Theme> = {
    width: '1.2em',
    height: '1.2em',
    color: UIColors.palette.main
  };*/

  return (
    <ItemPlain downMedium={medium}>
      <Stack sx={{
        width: '100%',
        [breakpoints.down('md')]: {
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5em',
          alignItems: 'flex-start'
        },
        [breakpoints.up('md')]: {
          display: 'grid',
          gridTemplateColumns: '5fr 6fr 8fr 3fr 5fr 1fr',
          columnGap: '3vw'
        }
      }}>
      {/*user.avatar 
        ? <Avatar src={user.avatar} sx={avatarSx} />
        : <AccountCircle sx={avatarSx} />*/}

        <UserPlainDescription user={user} date={date} downMedium={medium} onDelete={onDelete} />
      </Stack>
    </ItemPlain>
  );
};

const UserPlain = memo(RawUserPlain);
export default UserPlain;
