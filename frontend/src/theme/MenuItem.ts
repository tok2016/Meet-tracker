import { Components } from '@mui/material';

import {getCssVariable} from '../utils/Colors';
import { breakpoints } from './BasicTypography';
import { LgFontSizes, MdFontSizes, SmFontSizes, XlFontSizes, XsFontSizes } from './FontSizes';

const MenuItem: Components['MuiMenuItem'] = {
  styleOverrides: {
    root: {
      backgroundColor: getCssVariable('backgroundColor'),
      borderRadius: 50,
      color: getCssVariable('textMainColor'),
      [breakpoints.down('sm')]: {
        fontSize: XsFontSizes.menuItem
      },
      [breakpoints.up('sm')]: {
        fontSize: SmFontSizes.menuItem
      },
      [breakpoints.up('md')]: {
        fontSize: MdFontSizes.menuItem
      },
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
