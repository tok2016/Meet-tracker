import ButtonsTab from '../components/ButtonsTab';
import Page from '../utils/types/Page';
//import fakeSummaries from '../utils/mockSummaries.json';
//import { SummaryInfo } from '../utils/types/Summary';
import SummaryPlain from '../components/SummaryPlain';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSummary } from '../store/summary/summarySlice';
import { getSummaries } from '../store/summary/summaryThunks';
import { Pagination } from '@mui/material';

const SUMMARIES_PER_PAGE = 20;

const RecentSubpages: Page[] = [
  {
    name: 'Загрузить',
    path: '/account/upload',
    forAdmin: false,
    highlight: true
  }
];

const SummariesListPage = () => {
  const [page, setPage] = useState<number>(1);

  //const summaries = fakeSummaries as SummaryInfo[];
  const {summaries, total} = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();

  const onPageChange = (_evt: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  useEffect(() => {
    dispatch(getSummaries(page));
  }, [page, dispatch]);

  return (
    <>
      <ButtonsTab pages={RecentSubpages}/>
      <div>
        {summaries.map((summary) => (
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
        onChange={onPageChange}/>
    </>
  );
};

export default SummariesListPage;
