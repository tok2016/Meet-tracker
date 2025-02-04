import { Button, Dialog, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import PasswordField from './PasswordField';
import { KeyboardBackspace } from '@mui/icons-material';
import { INPUT_ICON_WIDTH } from '../../utils/utils';
import { AVATAR_WIDTH, NAV_BAR_MARGIN_BOTTOM } from '../../theme/MediaValues';
import userSchema from '../../schemas/userSchema';
import { isValidationError } from '../../schemas/validationError';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { postNewPasswordById } from '../../store/admin/adminThunks';
import { postNewPassword } from '../../store/user/userThunks';
import { UserPassword } from '../../types/User';
import { Status } from '../../types/Status';
import useMediaMatch from '../../hooks/useMediaMacth';
import { breakpoints } from '../../theme/BasicTypography';
import useMediaValue from '../../hooks/useMediaValue';
import FieldsGroup from '../FieldsGroup';
import ButtonContent from '../ButtonContent';
import { selectUser } from '../../store/user/userSlice';

type PasswordMenuProps = {
  userId: number,
  isForAdmin: boolean,
  isOpened: boolean,
  status: Status,
  toggleOpen: () => void
};

const PasswordMenu = ({userId, isForAdmin, isOpened, status, toggleOpen}: PasswordMenuProps) => {
  const [password, setPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>();

  const {passwordError} = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  
  const {small} = useMediaMatch();
  const marginTop = useMediaValue(AVATAR_WIDTH);
  const navBarPaddingBottom = useMediaValue(NAV_BAR_MARGIN_BOTTOM);

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

  const close = (currentStatus: Status) => {
    if(currentStatus !== 'pending') {
      setPassword('');
      setRepeatedPassword('');
      setError(undefined);
      toggleOpen();
    }
  };

  const resetPassword = async ({id, password}: UserPassword) => {
    try {
      if(isForAdmin) {
        await dispatch(postNewPasswordById({id, password}));
      } else {
        await dispatch(postNewPassword(password));
      }

      toggleOpen();
    } catch {
      console.error(`Couldn't update password`);
    }
  };

  useEffect(() => {
    if(isOpened) {
      validatePassword(password);
    }
  }, [isOpened])

  return (
    <Dialog
      open={isOpened}
      fullScreen={small}
      maxWidth='xs'
      fullWidth
      onClose={close}
      sx={{
        [breakpoints.down('md')]: {
          padding: `calc(${marginTop}px - ${navBarPaddingBottom}) 0 0`
        }
      }}
      PaperProps={{
        variant: small ? 'elevationFullScreen' : 'elevation'
      }}>
        <FieldsGroup>
            <Stack width='100%' position='relative'>
              <IconButton 
                color='secondary'
                onClick={() => close(status)}
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
              onClick={async () => await resetPassword({id: userId, password})}>
                <ButtonContent content='Подтвердить' status={status} />
            </Button>

            <Typography variant='error'>{passwordError}</Typography>
        </FieldsGroup>
    </Dialog>
  );
};

export default PasswordMenu;
