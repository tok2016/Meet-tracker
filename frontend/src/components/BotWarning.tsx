import { Alert, AlertTitle, Snackbar } from '@mui/material';
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
      onClose={toggleOpen}>
      <Alert severity='warning' variant='filled'>
        <AlertTitle>Ошибка</AlertTitle>
        Для отправки уведомлений в Telegram необходимо авторизоваться в нашем боте: {import.meta.env.VITE_BOT_URL}
      </Alert>
    </Snackbar>
  );
};

export default BotWarning;
