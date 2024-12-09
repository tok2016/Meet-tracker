import { Stack, Typography } from '@mui/material';
import { Description, InsertDriveFile, VolumeOff, VolumeUp } from '@mui/icons-material';

import SummaryMenu from './SummaryMenu';
import { statusesTranslations } from '../../utils/utils';
import { iconSx, innerSubPlainStyle, subPlainsStyle } from './SummaryPlainSx';
import { Status } from '../../types/Status';

type SummaryStatusProps = {
  id: number, 
  status: Status, 
  audioId: string | number, 
  hasText: boolean, 
  date: string,
  downMedium: boolean,
  isForAdmin: boolean,
  onDelete: () => void
};

const SummaryStatus = ({id, status, audioId, hasText, date, isForAdmin, downMedium, onDelete}: SummaryStatusProps) => (
  downMedium
  ? <Stack sx={{...subPlainsStyle, width: '40%'}}>
      <Stack sx={{...innerSubPlainStyle, width: '100%', alignItems: 'flex-end'}}>
        <Typography variant='h3' color={status === 'error' ? 'error' : 'textPrimary'} textAlign='right'>
          {statusesTranslations[status]}
        </Typography>

        <Stack sx={subPlainsStyle}>
          {audioId ? <VolumeUp sx={iconSx}/> : <VolumeOff sx={iconSx}/>}
          {hasText ? <Description sx={iconSx}/> : <InsertDriveFile sx={iconSx}/>}
        </Stack>
      </Stack>
    </Stack>
  : <Stack sx={subPlainsStyle}>
      <Typography variant='h3' color={status === 'error' ? 'error' : 'textPrimary'}>
        {statusesTranslations[status]}
      </Typography>

      {audioId ? <VolumeUp sx={iconSx}/> : <VolumeOff sx={iconSx}/>}
      {hasText ? <Description sx={iconSx}/> : <InsertDriveFile sx={iconSx}/>}

      <Typography variant='h3Normal'>
        {date}
      </Typography>
      <SummaryMenu id={id} isForAdmin={isForAdmin} downMedium={downMedium} onDelete={onDelete} />
    </Stack>
);

export default SummaryStatus;
