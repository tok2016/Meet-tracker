import { memo } from 'react';

import { SummaryInfo } from '../../types/Summary';
import { getLocaleString } from '../../utils/utils';
import ItemPlain from '../ItemPlain';
import SummaryTitle from './SummaryTitle';
import useMediaMatch from '../../hooks/useMediaMacth';
import SummaryStatus from './SummaryStatus';

const RawSummaryPlain = ({summary, isForAdmin=false, onDelete}: {summary: SummaryInfo, isForAdmin: boolean, onDelete: () => void}) => {
  const {medium} = useMediaMatch();
  const date = getLocaleString(summary.creationDate);

  return (
    <ItemPlain downMedium={medium}>
      <SummaryTitle 
        id={summary.id} 
        title={summary.title} 
        date={date} 
        downMedium={medium} />

      <SummaryStatus 
        id={summary.id} 
        status={summary.status} 
        audioId={summary.audioId} 
        hasText={summary.hasText} 
        date={date} 
        downMedium={medium} 
        isForAdmin={isForAdmin} 
        onDelete={onDelete} />
    </ItemPlain>
  );
};

const SummaryPlain = memo(RawSummaryPlain);

export default SummaryPlain;