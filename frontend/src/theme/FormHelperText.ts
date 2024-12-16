import { Components } from '@mui/material';

import { breakpoints } from './BasicTypography';
import { LgFontSizes, MdFontSizes, SmFontSizes, XlFontSizes, XsFontSizes } from './FontSizes';
import { getCssVariable } from '../utils/Colors';

const FormHelperText: Components['MuiFormHelperText'] = {
  styleOverrides: {
    root: {
      color: getCssVariable('errorColor'),
      [breakpoints.down('sm')]: {
        fontSize: XsFontSizes.subtitle1
      },
      [breakpoints.up('sm')]: {
        fontSize: SmFontSizes.subtitle1
      },
      [breakpoints.up('md')]: {
        fontSize: MdFontSizes.subtitle1
      },
      [breakpoints.up('lg')]: {
        fontSize: LgFontSizes.subtitle1
      },
      [breakpoints.only('xl')]: {
        fontSize: XlFontSizes.subtitle1
      },
    }
  }
};

export default FormHelperText;
