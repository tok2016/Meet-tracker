import { Components } from '@mui/material';

import {getCssVariable} from '../utils/Colors';
import { breakpoints } from './BasicTypography';

const InputLabel: Components['MuiInputLabel'] = {
  styleOverrides: {
    root: {
      color: getCssVariable('textSecondary'),
      [breakpoints.up('lg')]: {
        fontSize: 16,
        top: '-0.5em'
      },
      [breakpoints.only('xl')]: {
        fontSize: 24,
        top: '-0.1em'
      },
      fontWeight: 400
    },
    shrink: {
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
