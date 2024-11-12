import { Stack, SxProps, Typography, Theme } from '@mui/material';
import { Description, InsertDriveFile, PlayCircleOutline, VolumeOff, VolumeUp } from '@mui/icons-material';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { SummaryInfo } from '../utils/types/Summary';
import { TextColors } from '../utils/Colors';
import { statusesTranslations } from '../utils/utils';
import ItemPlain from './ItemPlain';

const RawSummaryPlain = ({summary}: {summary: SummaryInfo}) => {
  const date = new Date(summary.date).toLocaleDateString('ru-RU', {
    weekday: undefined,
    year: 'numeric',
    day: '2-digit',
    month: '2-digit'
  });

  const iconSx: SxProps<Theme> = {
    color: TextColors.main, 
    width: '1em', 
    height: '1em'
  };

  const subPlainsStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'row',
    gap: '1em',
    alignItems: 'center'
  };

  return (
    <ItemPlain>
      <Stack sx={subPlainsStyle}>
        <PlayCircleOutline sx={iconSx}/>
        <Link to={`/account/summary/${summary.id}`}>
          <Typography variant='h3'>
            {summary.title}
          </Typography>
        </Link>
      </Stack>

      <Stack sx={subPlainsStyle}>
        <Typography variant='h3' color={summary.status === 'error' ? 'error' : 'textPrimary'}>
          {statusesTranslations[summary.status]}
        </Typography>
        {summary.record.file ? <VolumeUp sx={iconSx}/> : <VolumeOff sx={iconSx}/>}
        {summary.hasText ? <Description sx={iconSx}/> : <InsertDriveFile sx={iconSx}/>}
        <Typography variant='h3Normal'>
          {date}
        </Typography>
      </Stack>
    </ItemPlain>
  );
};

const SummaryPlain = memo(RawSummaryPlain);

export default SummaryPlain;
