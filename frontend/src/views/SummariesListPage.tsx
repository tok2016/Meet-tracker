import { ChangeEvent, useEffect, useState } from 'react';
import { Pagination } from '@mui/material';

import ButtonsTab from '../components/ButtonsTab';
import Page from '../types/Page';
import SummaryPlain from '../components/summary/SummaryPlain';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSummary } from '../store/summary/summarySlice';
import { getSummaries } from '../store/summary/summaryThunks';
import FilterMenu from '../components/filters/FiltersMenu';
import Filter from '../types/Filter';
import { ITEMS_PER_PAGE } from '../utils/utils';
import { getAllSummaries } from '../store/admin/adminThunks';
import { selectAdminData } from '../store/admin/adminSlice';
import CollectionParams from '../types/CollectionParams';
import useMediaMatch from '../hooks/useMediaMacth';
import ErrorMessagePanel from '../components/ErrorMessagePanel';
import LocalProgress from '../components/LocalProgress';

const RecentSubpages: Page[] = [
  {
    name: 'Загрузить',
    path: '/account/upload',
    forAdmin: false,
    highlight: true
  }
];

const defaultSummaryFilter: Filter = {
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

  const {summaries: userSummaries, total: userTotal, error: userError, status: userStatus} = useAppSelector(selectSummary);
  const {summaries: adminSummaries, summariesTotal: adminTotal, error: adminError, status: adminStatus} = useAppSelector(selectAdminData);
  const dispatch = useAppDispatch();

  const {medium} = useMediaMatch();

  const onPageChange = (_evt: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  const summaries = isForAdmin ? adminSummaries : userSummaries;
  const totalCount = isForAdmin ? adminTotal : userTotal;
  const error = isForAdmin ? adminError : userError;
  const status = isForAdmin ? adminStatus : userStatus;

  const updateSummariesList = (currentPage: number, filter: Filter = defaultSummaryFilter) => {
    const query: CollectionParams = {
      page: currentPage,
      filter
    };

    dispatch(isForAdmin ? getAllSummaries(query) : getSummaries(query));
  };

  const submit = (filter: Filter) => {
    updateSummariesList(page, filter);
  };

  useEffect(() => {
    updateSummariesList(page);
  }, [page, dispatch]);

  if(!summaries.length) {
    if(status === 'pending') {
      return <LocalProgress />
    } else {
      return <ErrorMessagePanel error={error} errorIconType='summary' />
    }
  }

  return (
    <>
      <ButtonsTab pages={RecentSubpages} hidden={isForAdmin || medium}/>

      <FilterMenu 
        defaultFilter={defaultSummaryFilter}
        hidden={!isForAdmin}
        submit={submit} />

      <div style={{paddingTop: medium && !isForAdmin ? '5vh' : 0, width: '100%'}}>
        {summaries.map((summary) => (
          <SummaryPlain 
            key={summary.id} 
            summary={summary}
            isForAdmin={isForAdmin}
            onDelete={() => updateSummariesList(page)}/>
        ))}
      </div>

      <Pagination 
        count={Math.ceil(totalCount / ITEMS_PER_PAGE)}
        hidden={!totalCount}
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
