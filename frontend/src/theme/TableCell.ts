import { Components } from '@mui/material';

import { breakpoints } from './BasicTypography';
import { LgFontSizes, XlFontSizes } from './FontSizes';
import UIColors from '../utils/Colors';

const TableCell: Components['MuiTableCell'] = {
  styleOverrides: {
    root: {
      [breakpoints.up('lg')]: {
        fontSize: LgFontSizes.table
      },
      [breakpoints.only('xl')]: {
        fontSize: XlFontSizes.table
      },
      border: `solid 5px ${UIColors.tertiary}`
    }
  },
  variants: [
    {
      props: {
        variant: 'head'
      },
      style: {
        textAlign: 'center',
        fontWeight: 700
      }
    },
    {
      props: {
        variant: 'body'
      },
      style: {
        '& textarea': {
          verticalAlign: 'middle',
          backgroundColor: 'transparent',
          ':focus': {
            border: 'none'
          }
        }
      }
    }
  ]
};

export default TableCell;
