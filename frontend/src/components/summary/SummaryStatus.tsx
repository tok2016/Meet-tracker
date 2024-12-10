import { Stack, Typography } from '@mui/material';
import { Close, InsertDriveFile, VolumeOff, VolumeUp } from '@mui/icons-material';

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
  ? <Stack sx={{...subPlainsStyle, width: '40%', position: 'relative'}}>
      <Stack sx={{...innerSubPlainStyle, width: '100%', alignItems: 'flex-end'}}>
        <Typography variant='h3' color={status === 'error' ? 'error' : 'textPrimary'} textAlign='right'>
          {statusesTranslations[status]}
        </Typography>

        <Stack sx={subPlainsStyle}>
          {audioId ? <VolumeUp sx={iconSx}/> : <VolumeOff sx={iconSx}/>}
          {hasText ? <InsertDriveFile sx={iconSx}/> : <Close sx={iconSx}/>}
        </Stack>
      </Stack>

      <SummaryMenu id={id} isForAdmin={isForAdmin} downMedium={downMedium} onDelete={onDelete} />
    </Stack>
  : <Stack sx={subPlainsStyle}>
      <Typography variant='h3' color={status === 'error' ? 'error' : 'textPrimary'}>
        {statusesTranslations[status]}
      </Typography>

      {audioId ? <VolumeUp sx={iconSx}/> : <VolumeOff sx={iconSx}/>}
      {hasText ? <InsertDriveFile sx={iconSx}/> : <Close sx={iconSx}/>}

      <Typography variant='h3Normal'>
        {date}
      </Typography>
      <SummaryMenu id={id} isForAdmin={isForAdmin} downMedium={downMedium} onDelete={onDelete} />
    </Stack>
);

export default SummaryStatus;
