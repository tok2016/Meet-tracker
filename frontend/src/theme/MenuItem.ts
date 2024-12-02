import { Components } from '@mui/material';

import UIColors from '../utils/Colors';
import { breakpoints } from './BasicTypography';
import { LgFontSizes, XlFontSizes } from './FontSizes';

const MenuItem: Components['MuiMenuItem'] = {
  styleOverrides: {
    root: {
      backgroundColor: UIColors.background,
      borderRadius: 50,
      color: UIColors.textMain,
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
