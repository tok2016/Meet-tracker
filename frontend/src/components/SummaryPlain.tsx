import { Paper, SxProps, Typography } from '@mui/material';
import { Description, InsertDriveFile, PlayCircleOutline, VolumeOff, VolumeUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { SummaryInfo } from '../utils/types/Summary';
import { TextColors } from '../utils/Colors';
import { statusesTranslations } from '../utils/utils';
import { CSSProperties, memo } from 'react';
import { Theme } from '@emotion/react';
import { PAPER_SMALL_PADDING } from '../utils/theme/Paper';

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

  const subPlainsStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '1em',
    alignItems: 'center'
  };

  return (
    <Paper 
      variant='elevationSmall'
      sx={(theme) => (theme.components?.MuiPaper ? {
        ...theme.components.MuiPaper?.defaultProps?.sx,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '20px',
        alignItems: 'center',
        width: `calc(100% - 2 * ${PAPER_SMALL_PADDING})`
      } : {})}>
        <div style={subPlainsStyle}>
          <PlayCircleOutline sx={iconSx}/>
          <Link to={`/account/summaries/mock`}>
            <Typography variant='h3'>
              {summary.title}
            </Typography>
          </Link>
        </div>

        <div style={subPlainsStyle}>
          <Typography variant='h3' color={summary.status === 'error' ? 'error' : 'textPrimary'}>
            {statusesTranslations[summary.status]}
          </Typography>
          {summary.record.file ? <VolumeUp sx={iconSx}/> : <VolumeOff sx={iconSx}/>}
          {summary.hasText ? <Description sx={iconSx}/> : <InsertDriveFile sx={iconSx}/>}
          <Typography variant='h3Normal'>
            {date}
          </Typography>
        </div>
    </Paper>
  );
};

const SummaryPlain = memo(RawSummaryPlain);

export default SummaryPlain;
