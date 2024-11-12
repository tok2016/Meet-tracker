import { ChangeEvent, useEffect, useState } from 'react';
import { Pagination } from '@mui/material';

import ButtonsTab from '../components/ButtonsTab';
import Page from '../utils/types/Page';
import SummaryPlain from '../components/SummaryPlain';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSummary } from '../store/summary/summarySlice';
import { getSummaries } from '../store/summary/summaryThunks';
import FilterMenu from '../components/FiltersMenu';
import Filter from '../utils/types/Filter';
import { ITEMS_PER_PAGE } from '../utils/utils';
import { selectUser } from '../store/user/userSlice';
import { getAllSummaries } from '../store/admin/adminThunks';
import { selectAdminData } from '../store/admin/adminSlice';

const RecentSubpages: Page[] = [
  {
    name: 'Загрузить',
    path: '/account/upload',
    forAdmin: false,
    highlight: true
  }
];

const defaultFilter: Filter = {
  sort: 'title',
  direction: 1,
  title: '',
  username: '',
  from: '',
  to: '',
  archived: false
};

const SummariesListPage = ({isForAdmin = false}: {isForAdmin?: boolean}) => {
  const [page, setPage] = useState<number>(1);

  const {user} = useAppSelector(selectUser);
  const {summaries: userSummaries, total} = useAppSelector(selectSummary);
  const {summaries: adminSummaries, summariesTotal} = useAppSelector(selectAdminData);
  const dispatch = useAppDispatch();

  const onPageChange = (_evt: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  const summaries = user.isAdmin ? adminSummaries : userSummaries;
  const totalCount = user.isAdmin ? summariesTotal : total;

  useEffect(() => {
    if(user.isAdmin) {
      dispatch(getAllSummaries(page));
    } else {
      dispatch(getSummaries(page));
    }
  }, [page, dispatch, user.isAdmin]);

  const submit = (filter: Filter) => {
    
  }

  return (
    <>
      <ButtonsTab pages={RecentSubpages} hidden={isForAdmin}/>
      <FilterMenu 
        defaultFilter={defaultFilter}
        hidden={!isForAdmin}
        submit={submit} />
      <div>
        {summaries.map((summary) => (
          <SummaryPlain key={summary.id} summary={summary} />
        ))}
      </div>
      <Pagination 
        count={totalCount % ITEMS_PER_PAGE + 1}
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

export default SummariesListPage;
