import { Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import useMediaMatch from '../hooks/useMediaMacth';
import FormHolder from '../components/FormHolder';
import UserProfileForm from '../components/user/UserProfileForm';
import DeleteUserButton from '../components/user/DeleteButton';
import { useAppSelector } from '../hooks/useAppDispatch';
import { selectUser } from '../store/user/userSlice';
import { selectAdminData } from '../store/admin/adminSlice';

const UserPage = ({isForAdmin=false}: {isForAdmin?: boolean}) => {
  const {small, medium} = useMediaMatch();

  const {id} = useParams();
  const parsedId = parseInt(id ?? '');

  const {user: originalUser} = useAppSelector(selectUser);
  const {user: anotherUser} = useAppSelector(selectAdminData);

  const user = isForAdmin ? anotherUser : originalUser;
  const disabled = isForAdmin && user.isAdmin;

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
            id={parsedId} />
        </Stack>

        <DeleteUserButton 
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
              id={parsedId} />
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
            id={parsedId} />
      </Stack>
    </>
  );
};

export default UserPage;
