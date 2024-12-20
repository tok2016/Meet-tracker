import { Alert, AlertTitle, Snackbar } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { hideListError, selectAdminData } from '../store/admin/adminSlice';

const AUTO_HIDE_TIME = 7000;

const ListAlert = ({listType}: {listType: 'user'| 'summary'}) => {
  const {userError, summaryError} = useAppSelector(selectAdminData);
  const error = listType === 'user' ? userError : summaryError;

  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(hideListError());
  };

  return (
    <Snackbar 
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      open={error !== undefined}
      autoHideDuration={AUTO_HIDE_TIME}
      onClose={onClose}>
        <Alert severity='error' variant='filled'>
          <AlertTitle>Ошибка</AlertTitle>
          {error}
        </Alert>
    </Snackbar>
  );
};

export default ListAlert;
