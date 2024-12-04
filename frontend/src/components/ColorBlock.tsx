import { Box, Stack, Typography } from '@mui/material';

import { HexColor } from '../types/HexColor';
import UIColors from '../utils/Colors';

const COLOR_WIDTH = '5vw';

const ColorBlock = ({color}: {color: HexColor}) => (
  <Stack display='block'>
    <Box sx={{
      width: COLOR_WIDTH,
      height: COLOR_WIDTH,
      backgroundColor: color,
      border: `solid 3px ${UIColors.palette.main}`,
      borderRadius: 50,
      margin: '0 auto calc(1vh + 5px)'
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
