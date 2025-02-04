import { Pagination } from '@mui/material';

import FilterMenu from '../components/filters/FiltersMenu';
import UserPlain from '../components/user/UserPlain';
import Filter from '../types/Filter';
import { ChangeEvent, useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from '../utils/utils';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectAdminData } from '../store/admin/adminSlice';
import { getUsers } from '../store/admin/adminThunks';
import LocalProgress from '../components/LocalProgress';
import ErrorMessagePanel from '../components/ErrorMessagePanel';
import ListAlert from '../components/ListAlert';

const defaultUserFilter: Filter = {
  sort: 'username',
  direction: 1,
  username: '',
  from: '',
  to: '',
  name: '',
  admin: false
}

const UsersListPage = () => {
  const [page, setPage] = useState<number>(1);

  const {users, usersTotal, error, status} = useAppSelector(selectAdminData);
  const dispatch = useAppDispatch();

  const onPageChange = (_evt: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  const updateUsersList = (currentPage: number, filter: Filter = defaultUserFilter) => {
    dispatch(getUsers({page: currentPage, filter}));
  };

  const submit = (filter: Filter) => {
    updateUsersList(page, filter);
  };

  useEffect(() => {
    updateUsersList(page);
  }, [page, dispatch]);

  if(status === 'pending') {
    return <LocalProgress />
  } else if(!users.length) {
    return <ErrorMessagePanel error={error} errorIconType='user' />
  }

  return (
    <>
      <FilterMenu
        hidden={false}
        defaultFilter={defaultUserFilter}
        submit={submit} />
      <div>
        {users.map((user) => (
          <UserPlain 
            key={user.id} 
            user={user} 
            onDelete={() => updateUsersList(page)} />
        ))}
      </div>
      <Pagination 
        count={Math.ceil(usersTotal / ITEMS_PER_PAGE)}
        defaultPage={1}
        shape='rounded' 
        color='primary'
        showFirstButton
        showLastButton
        onChange={onPageChange}
        style={{margin: '0 auto'}}/>

      <ListAlert listType='user' />
    </>
  );
};

export default UsersListPage;
