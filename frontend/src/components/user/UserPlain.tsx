import { Stack, SxProps, Theme } from '@mui/material';
//import { AccountCircle } from '@mui/icons-material';
import { memo } from 'react';

import { User } from '../../types/User';
import ItemPlain from '../ItemPlain';
import { getLocaleString } from '../../utils/utils';
import useMediaMatch from '../../hooks/useMediaMacth';
import UserPlainDescription from './UserPlainDescription';
import { breakpoints } from '../../theme/BasicTypography';
import UserPlainMenu from './UserPlainMenu';

const RawUserPlain = ({user, onDelete}: {user: User, onDelete: () => void}) => {
  const {small, medium} = useMediaMatch();

  const date = getLocaleString(user.registrationDate);

  /*const avatarSx: SxProps<Theme> = {
    width: '1.2em',
    height: '1.2em',
    color: UIColors.palette.mainColor
  };*/

  const MobilePlainSx: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5em',
    alignItems: 'flex-start'
  };

  return (
    <ItemPlain downMedium={small} isForAdmin={true}>
      <Stack sx={{
        width: '100%',
        [breakpoints.down('md')]: {
          ...MobilePlainSx
        },
        [breakpoints.only('md')]: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '25px'
        },
        [breakpoints.up('lg')]: {
          display: 'grid',
          gridTemplateColumns: '5fr 6fr 8fr 3fr 5fr 1fr',
          columnGap: '3vw'
        }
      }}>
      {/*user.avatar 
        ? <Avatar src={user.avatar} sx={avatarSx} />
        : <AccountCircle sx={avatarSx} />*/}

        {medium && !small
          ? <>
              <Stack sx={{...MobilePlainSx, width: '100%'}}>
                <UserPlainDescription user={user} date={date} medium={medium} downMedium={small} onDelete={onDelete} />
              </Stack>
              <UserPlainMenu user={user} onDelete={onDelete} />
            </>
          : <UserPlainDescription user={user} date={date} medium={medium} downMedium={small} onDelete={onDelete} />}
      </Stack>
    </ItemPlain>
  );
};

const UserPlain = memo(RawUserPlain);
export default UserPlain;
