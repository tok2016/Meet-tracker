import { Components } from '@mui/material';

import {getCssVariable} from '../utils/Colors';
import { breakpoints } from './BasicTypography';
import { LgFontSizes, SmFontSizes, XlFontSizes, XsFontSizes } from './FontSizes';

const FilledInput: Components['MuiFilledInput'] = {
  styleOverrides: {
    root: {
      border: 'none',
      borderRadius: 10,
      backgroundColor: getCssVariable('backgroundColor'),
      color: getCssVariable('textMainColor'),
      [breakpoints.down('sm')]: {
        fontSize: XsFontSizes.input
      },
      [breakpoints.up('sm')]: {
        fontSize: SmFontSizes.input
      },
      [breakpoints.up('lg')]: {
        fontSize: LgFontSizes.input
      },
      [breakpoints.only('xl')]: {
        fontSize: XlFontSizes.input
      },
      height: '2.5em'
    },
    underline: {
      display: 'none'
    }
  }
};

export default FilledInput;
