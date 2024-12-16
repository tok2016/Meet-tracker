import { Components } from '@mui/material';

import {getCssVariable} from '../utils/Colors';
import { breakpoints } from './BasicTypography';
import { LgFontSizes, MdFontSizes, SmFontSizes, XlFontSizes, XsFontSizes } from './FontSizes';

const OutlinedInput: Components['MuiOutlinedInput'] = {
  styleOverrides: {
    root: {
      border: `solid 1px ${getCssVariable('tertiaryColor')}`,
      borderRadius: 10,
      backgroundColor: getCssVariable('backgroundColor'),
      color: getCssVariable('textMainColor'),
      [breakpoints.down('sm')]: {
        fontSize: XsFontSizes.input
      },
      [breakpoints.up('sm')]: {
        fontSize: SmFontSizes.input
      },
      [breakpoints.up('md')]: {
        fontSize: MdFontSizes.input
      },
      [breakpoints.up('lg')]: {
        fontSize: LgFontSizes.input
      },
      [breakpoints.only('xl')]: {
        fontSize: XlFontSizes.input
      },
      height: '2.5em'
    }
  }
}

export default OutlinedInput;
