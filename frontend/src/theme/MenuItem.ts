import { Components } from '@mui/material';

import {getCssVariable} from '../utils/Colors';
import { breakpoints } from './BasicTypography';
import { LgFontSizes, XlFontSizes } from './FontSizes';

const MenuItem: Components['MuiMenuItem'] = {
  styleOverrides: {
    root: {
      backgroundColor: getCssVariable('background'),
      borderRadius: 50,
      color: getCssVariable('textMain'),
      [breakpoints.up('lg')]: {
        fontSize: LgFontSizes.menuItem
      },
      [breakpoints.only('xl')]: {
        fontSize: XlFontSizes.menuItem
      },
      marginBottom: '5px',
      ':nth-last-of-type': {
        marginBottom: '0px'
      }
    }
  }
};

export default MenuItem;
