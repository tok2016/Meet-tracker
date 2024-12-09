import { Stack, Typography } from '@mui/material';

import AvatarUploadInput from './AvatarUploadInput';
import DeleteUserButton from './DeleteButton';
import { User } from '../../types/User';
import { getLocaleString } from '../../utils/utils';
import useMediaMatch from '../../hooks/useMediaMacth';

const UserInfo = ({user, id, isForAdmin, disabled}: {id: number, user: User, isForAdmin: boolean, disabled: boolean}) => {
  const userDate = getLocaleString(user.registrationDate ?? (new Date()).toISOString());

  const {medium} = useMediaMatch();

  return (
    <Stack
      display='flex'
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      marginBottom='20px'>
        <Stack
          display='flex'
          flexDirection='row'
          alignItems='center'
          gap='10px'>
            <AvatarUploadInput 
              sx={{width: '2.5em', height: '2.5em'}} 
              defaultAvatar={user.avatar}
              isForAdmin={isForAdmin}
              disabled={disabled}
              userId={id} />
            <div>
              <Typography variant='h4'>{user.firstName} {user.lastName}</Typography>
              <Typography variant='body1'>Дата регистрации: {userDate}</Typography>
            </div>
        </Stack>

        <DeleteUserButton userId={id} isForAdmin={isForAdmin} isUserAdmin={user.isAdmin} hidden={medium} />
    </Stack>
  );
};

export default UserInfo;
