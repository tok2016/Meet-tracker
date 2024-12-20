import { Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import useMediaMatch from '../hooks/useMediaMacth';
import FormHolder from '../components/FormHolder';
import UserProfileForm from '../components/user/UserProfileForm';
import DeleteUserButton from '../components/user/DeleteButton';
import { useAppSelector } from '../hooks/useAppDispatch';
import { selectUser } from '../store/user/userSlice';
import { selectAdminData } from '../store/admin/adminSlice';
import ErrorMessagePanel from '../components/ErrorMessagePanel';

const UserPage = ({isForAdmin=false}: {isForAdmin?: boolean}) => {
  const {small, medium} = useMediaMatch();

  const {id} = useParams();
  const parsedId = parseInt(id ?? '');

  const {user: originalUser, status: originalStatus, error: originalError} = useAppSelector(selectUser);
  const {user: anotherUser, status: anotherStatus, userError: anotherError} = useAppSelector(selectAdminData);

  const user = isForAdmin ? anotherUser : originalUser;
  const status = isForAdmin ? anotherStatus : originalStatus;
  const error = isForAdmin ? anotherError : originalError;

  const disabled = isForAdmin && user.isAdmin;

  if(status === 'error' && !user.username) {
    return <ErrorMessagePanel error={error} errorIconType='user' />
  }

  if(small) {
    return (
      <FormHolder isInner>
        <Typography variant='h2' marginBottom='15px'>
          Настройки
        </Typography>

        <Stack
          display='flex'
          flexDirection='column'
          minHeight='80%'
          sx={{
            overflowY: 'auto',
          }}>
          <UserProfileForm 
            isForAdmin={isForAdmin} 
            user={user} 
            disabled={disabled} 
            id={parsedId}
            status={status}
            error={error} />
        </Stack>

        <DeleteUserButton 
          status={status}
          userId={parsedId} 
          isForAdmin={isForAdmin} 
          isUserAdmin={user.isAdmin} 
          hidden={false} />
      </FormHolder>
    );
  } else if(medium) {
    return (
      <Stack
        width='100%'
        marginTop='4vh'>
        <Typography variant='h2' marginBottom='15px'>Настройки</Typography>

        <Stack
          width='100%'>
            <UserProfileForm 
              isForAdmin={isForAdmin} 
              user={user} 
              disabled={disabled} 
              id={parsedId}
              status={status}
              error={error} />
        </Stack>
      </Stack>
    );
  }
  return (
    <>
      <Typography variant='h2'>Настройки</Typography>

      <Stack
        width='60%'
        margin='4.5vh auto 0'>
          <UserProfileForm 
            isForAdmin={isForAdmin} 
            user={user} 
            disabled={disabled} 
            id={parsedId}
            status={status}
            error={error} />
      </Stack>
    </>
  );
};

export default UserPage;
