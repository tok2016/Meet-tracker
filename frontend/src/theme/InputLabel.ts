import { Components } from '@mui/material';

import {getCssVariable} from '../utils/Colors';
import { breakpoints } from './BasicTypography';
import { LgFontSizes, MdFontSizes, SmFontSizes, XlFontSizes, XsFontSizes } from './FontSizes';

const InputLabel: Components['MuiInputLabel'] = {
  styleOverrides: {
    root: {
      color: getCssVariable('textSecondaryColor'),
      [breakpoints.down('sm')]: {
        fontSize: XsFontSizes.input,
        top: '-0.5em'
      },
      [breakpoints.up('sm')]: {
        fontSize: SmFontSizes.input,
        top: '-0.5em'
      },
      [breakpoints.up('md')]: {
        fontSize: MdFontSizes.input,
        top: '-0.15em',
      },
      [breakpoints.up('lg')]: {
        fontSize: LgFontSizes.input,
        top: '-0.5em'
      },
      [breakpoints.only('xl')]: {
        fontSize: XlFontSizes.input,
        top: '-0.1em'
      },
      fontWeight: 400
    },
    shrink: {
      [breakpoints.down('sm')]: {
        top: '0.1em'
      },
      [breakpoints.up('sm')]: {
        top: '0.1em'
      },
      [breakpoints.up('md')]: {
        top: '-0.1em'
      },
      [breakpoints.up('lg')]: {
        top: '0'
      },
      [breakpoints.only('xl')]: {
        top: '-0.25em'
      },
    }
  }
};

export default InputLabel;
