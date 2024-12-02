import { Components } from '@mui/material';

import UIColors from '../utils/Colors';
import { breakpoints } from './BasicTypography';

const FilledInput: Components['MuiFilledInput'] = {
  styleOverrides: {
    root: {
      border: 'none',
      borderRadius: 10,
      backgroundColor: UIColors.background,
      color: UIColors.textMain,
      [breakpoints.up('lg')]: {
        fontSize: 16
      },
      [breakpoints.only('xl')]: {
        fontSize: 24
      },
      height: '2.5em'
    },
    underline: {
      display: 'none'
    }
  }
};

export default FilledInput;
