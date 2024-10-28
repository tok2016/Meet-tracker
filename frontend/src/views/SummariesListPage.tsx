import ButtonsTab from '../components/ButtonsTab';
import Page from '../utils/types/Page';
import mockSummaries from '../utils/mockSummaries.json';
import { SummaryInfo } from '../utils/types/Summary';
import SummaryPlain from '../components/SummaryPlain';

const RecentSubpages: Page[] = [
  {
    name: 'Загрузить',
    path: '/account/upload',
    forAdmin: false,
    highlight: true
  }
];

const SummariesListPage = () => {
  const summaries = mockSummaries as SummaryInfo[];

  console.log('summaries')

  return (
    <>
      <ButtonsTab pages={RecentSubpages}/>
      <div>
        {summaries.map((summary) => (
          <SummaryPlain key={summary.id} summary={summary} />
        ))}
      </div>
    </>
  );
};

export default SummariesListPage;
