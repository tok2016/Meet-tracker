import { Close } from '@mui/icons-material';
import { Alert, AlertTitle, IconButton, Snackbar } from '@mui/material';
import { useReducer } from 'react';

const BotWarning = ({chatId, isForAdmin}: {chatId: string, isForAdmin: boolean}) => {
  const [isOpened, toggleOpen] = useReducer((value) => !value, !chatId);

  if(isForAdmin) {
    return;
  }

  return (
    <Snackbar 
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      open={isOpened}
      action={
        <IconButton size='small' color='info' onClick={toggleOpen}>
          <Close />
        </IconButton>
      }>
        <Alert severity='warning' variant='filled'>
          <AlertTitle>Ошибка</AlertTitle>
          Для отправки уведомлений в Telegram<br/>необходимо авторизоваться в нашем боте: {import.meta.env.VITE_BOT_URL}
        </Alert>
    </Snackbar>
  );
};

export default BotWarning;
