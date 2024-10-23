import { Components } from '@mui/material';

import { UIColors, TextColors } from '../Colors';
import { breakpoints } from './BasicTypography';

const OutlinedInput: Components['MuiOutlinedInput'] = {
  styleOverrides: {
    root: {
      border: `solid 1px ${UIColors.tertiary}`,
      borderRadius: 10,
      backgroundColor: UIColors.background,
      color: TextColors.main,
      [breakpoints.up('lg')]: {
        fontSize: 16
      },
      [breakpoints.only('xl')]: {
        fontSize: 24
      },
      height: '2.5em'
    }
  }
}

export default OutlinedInput;
