import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useAppSelector } from '../hooks/useAppDispatch';
import { selectUser } from '../store/userSlice';

const UserPage = () => {
  const {user} = useAppSelector(selectUser);

  return (
    <Container>
      <Typography variant='h2'>{user.username}</Typography>
      <Typography variant='h3'>{user.firstName} {user.lastName}</Typography>
      <Typography variant='body1'>{user.email}</Typography>
      <Typography variant='body2'>{new Date(user.registrationDate).toLocaleTimeString()}</Typography>

      <List>
        {user.summaries.map((summary) => (
          <ListItem key={summary.id}>
            <ListItemText>{summary.title}</ListItemText>
            <ListItemText>{new Date(summary.date).toLocaleString()}</ListItemText>
          </ListItem>
        ))}
      </List>

    </Container>
  );
};

export default UserPage;
