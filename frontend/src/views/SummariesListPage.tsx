import ButtonsTab from '../components/ButtonsTab';
import Page from '../utils/types/Page';
import fakeSummaries from '../utils/mockSummaries.json';
//import { SummaryInfo } from '../utils/types/Summary';
import SummaryPlain from '../components/SummaryPlain';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSummary } from '../store/summary/summarySlice';
import { getSummaries } from '../store/summary/summaryThunks';
import { Pagination } from '@mui/material';
import { SummaryInfo } from '../utils/types/Summary';
import FilterMenu from '../components/FiltersMenu';
import Filter from '../utils/types/Filter';

const SUMMARIES_PER_PAGE = 20;

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

const SummariesListPage = ({isAdmin = false}: {isAdmin?: boolean}) => {
  const [page, setPage] = useState<number>(1);

  const {summaries, total} = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();

  const onPageChange = (_evt: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  const finalSummaries = summaries.length ? summaries : fakeSummaries as SummaryInfo[];

  useEffect(() => {
    dispatch(getSummaries(page));
  }, [page, dispatch]);

  const submit = (filter: Filter) => {
    
  }

  return (
    <>
      <ButtonsTab pages={RecentSubpages}/>
      <FilterMenu 
        defaultFilter={defaultFilter}
        submit={submit} />
      <div>
        {finalSummaries.map((summary) => (
          <SummaryPlain key={summary.id} summary={summary} />
        ))}
      </div>
      <Pagination 
        count={total % SUMMARIES_PER_PAGE + 1}
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
