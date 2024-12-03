import { SxProps, Theme } from '@mui/material';

import {getCssVariable} from '../utils/Colors';
import { INPUT_ICON_WIDTH } from '../utils/utils';
import { breakpoints } from './BasicTypography';

const UserIconSx: SxProps<Theme> = {
  color: getCssVariable('textMain'), 
  width: INPUT_ICON_WIDTH, 
  height: INPUT_ICON_WIDTH,
  [breakpoints.up('lg')]: {
    fontSize: 20
  },
  [breakpoints.up('xl')]: {
    fontSize: 32
  }
};

export {UserIconSx}
