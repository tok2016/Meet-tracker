import { Button, Dialog, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import PasswordField from './PasswordField';
import { KeyboardBackspace } from '@mui/icons-material';
import { INPUT_ICON_WIDTH } from '../utils/utils';
import userSchema from '../schemas/userSchema';
import { isValidationError } from '../schemas/validationError';

type PasswordMenuProps = {
  isOpened: boolean,
  toggleOpen: () => void,
  updatePassword: (password: string) => void
};

const PasswordMenu = ({isOpened, toggleOpen, updatePassword}: PasswordMenuProps) => {
  const [password, setPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>();

  const arePasswordsTheSame = password === repeatedPassword;

  const validatePassword = (value: string) => {
    try {
      const validated = userSchema.validateSyncAt('password', {password: value});
      setPassword(validated);
      setError(undefined);
    } catch(err) {
      if(isValidationError(err)) {
        setPassword(err.value)
        setError(err.message);
      }
    }
  };

  const onClose = () => {
    setPassword('');
    setRepeatedPassword('');
    setError(undefined);
    toggleOpen();
  };

  useEffect(() => {
    validatePassword(password);
  }, [])

  return (
    <Dialog
      open={isOpened}
      maxWidth='xs'
      fullWidth
      onClose={onClose}
      PaperProps={{
        variant: 'elevation'
      }}>
        <Stack
          width='100%'
          display='flex'
          flexDirection='column'
          gap='4.5vh'
          alignItems='center'>
            <Stack width='100%' position='relative'>
              <IconButton 
                color='secondary'
                onClick={onClose}
                style={{
                  position: 'absolute',
                  left: 0
                }}>
                  <KeyboardBackspace sx={{ width: INPUT_ICON_WIDTH, height: INPUT_ICON_WIDTH }} />
              </IconButton>

              <Typography variant='h2'>
                Смена пароля
              </Typography>
            </Stack>

            <Stack
              width='100%'
              display='flex'
              flexDirection='column'
              gap='1vh'>
                <PasswordField
                  value={password}
                  label='Новый пароль'
                  errorMessage={error}
                  onChange={(evt) => validatePassword(evt.target.value)}
                  />

                <PasswordField
                  value={repeatedPassword}
                  label='Повторите пароль'
                  errorMessage={arePasswordsTheSame ? '' : 'Пароли не совпадают'}
                  onChange={(evt) => setRepeatedPassword(evt.target.value)}
                  />
            </Stack>

            <Button
              variant='containtedSecondary'
              disabled={error !== undefined || !arePasswordsTheSame}
              onClick={() => updatePassword(password)}>
                Подтвердить
            </Button>
        </Stack>
    </Dialog>
  );
};

export default PasswordMenu;
