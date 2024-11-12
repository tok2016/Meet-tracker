import { Pagination } from '@mui/material';

import FilterMenu from '../components/FiltersMenu';
import UserPlain from '../components/UserPlain';
import Filter from '../utils/types/Filter';
import { ChangeEvent, useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from '../utils/utils';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectAdminData } from '../store/admin/adminSlice';
import { getUsers } from '../store/admin/adminThunks';

const defaultFilter: Filter = {
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

  const {users, usersTotal} = useAppSelector(selectAdminData);
  const dispatch = useAppDispatch();

  const onPageChange = (_evt: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  const submit = (filter: Filter) => {

  };

  useEffect(() => {
    dispatch(getUsers(page));
  }, [page, dispatch]);

  return (
    <>
      <FilterMenu
        hidden={false}
        defaultFilter={defaultFilter}
        submit={submit} />
      <div>
        {users.map((user) => (
          <UserPlain key={user.username} user={user} />
        ))}
      </div>
      <Pagination 
        count={usersTotal % ITEMS_PER_PAGE + 1}
        defaultPage={1}
        shape='rounded' 
        color='primary'
        showFirstButton
        showLastButton
        onChange={onPageChange}
        style={{margin: '0 auto'}}/>
    </>
  );
};

export default UsersListPage;
