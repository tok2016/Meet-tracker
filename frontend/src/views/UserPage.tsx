import { Container, Typography } from '@mui/material';
import { useAppSelector } from '../hooks/useAppDispatch';
import { selectUser } from '../store/user/userSlice';

const UserPage = () => {
  const {user} = useAppSelector(selectUser);

  return (
    <Container>
      <Typography variant='h2'>{user.username}</Typography>
      <Typography variant='h3'>{user.firstName} {user.lastName}</Typography>
      <Typography variant='body1'>{user.email}</Typography>
      <Typography variant='body2'>{new Date(user.registrationDate).toLocaleTimeString()}</Typography>
    </Container>
  );
};

export default UserPage;
