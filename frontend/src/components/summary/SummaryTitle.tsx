import { PlayCircleOutline } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { iconSx, innerSubPlainStyle, subPlainsStyle } from './SummaryPlainSx';

const SummaryTitle = ({id, title, date, downMedium}: {id: number, title: string, date: string, downMedium: boolean}) => (
  downMedium
  ? <Stack sx={{...subPlainsStyle, width: '55%'}}>
      <Stack sx={{...innerSubPlainStyle, overflow: 'hidden'}}>
        <Link to={`/account/summary/${id}`} style={{overflow: 'hidden', width: '100%'}}>
          <Typography variant='h3' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' textAlign='left'>
            {title}
          </Typography>
        </Link>

        <Typography variant='h3Normal' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' textAlign='left'>
          {date}
        </Typography>
      </Stack>
    </Stack>
  : <Stack sx={subPlainsStyle}>
      <PlayCircleOutline sx={iconSx}/>
      <Link to={`/account/summary/${id}`}>
        <Typography variant='h3'>
          {title}
        </Typography>
      </Link>
    </Stack>
);

export default SummaryTitle;
