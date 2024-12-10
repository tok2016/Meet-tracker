import { SxProps, Theme } from '@mui/material';

import {getCssVariable} from '../utils/Colors';
import { INPUT_ICON_WIDTH } from '../utils/utils';
import { breakpoints } from './BasicTypography';
import { LgFontSizes, SmFontSizes, XlFontSizes, XsFontSizes } from './FontSizes';

const UserIconSx: SxProps<Theme> = {
  color: getCssVariable('textMainColor'), 
  width: INPUT_ICON_WIDTH, 
  height: INPUT_ICON_WIDTH,
  [breakpoints.down('sm')]: {
    fontSize: XsFontSizes.h3
  },
  [breakpoints.up('sm')]: {
    fontSize: SmFontSizes.h3
  },
  [breakpoints.up('lg')]: {
    fontSize: LgFontSizes.h3
  },
  [breakpoints.only('xl')]: {
    fontSize: XlFontSizes.h3
  }
};

export {UserIconSx}
