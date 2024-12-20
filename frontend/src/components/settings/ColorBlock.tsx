import { Box, Stack, Typography } from '@mui/material';

import { HexColor } from '../../types/HexColor';
import MediaValue from '../../types/MediaValue';
import { breakpoints } from '../../theme/BasicTypography';

const COLOR_WIDTH: MediaValue = {
  xs: '8vw',
  sm: '8vw',
  md: '8vw',
  lg: '5vw',
  xl: '5vw'
};

const ColorBlock = ({color}: {color: HexColor}) => (
  <Stack display='block'>
    <Box sx={{
      backgroundColor: color,
      border: `solid 1px #00000070`,
      borderRadius: 50,
      margin: '0 auto',
      [breakpoints.down('md')]: {
        width: COLOR_WIDTH.sm,
        height: COLOR_WIDTH.sm,
        marginBottom: '5px',
      },
      [breakpoints.only('md')]: {
        width: COLOR_WIDTH.md,
        height: COLOR_WIDTH.md,
        marginBottom: 'calc(1vh + 5px)',
      },
      [breakpoints.up('lg')]: {
        width: COLOR_WIDTH.lg,
        height: COLOR_WIDTH.lg,
        marginBottom: 'calc(1vh + 5px)',
      }
    }}>
    </Box>

    <Typography 
      variant='body1'
      textAlign='center'>
        {color}
    </Typography>
  </Stack>
);

export default ColorBlock;
