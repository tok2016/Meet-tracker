import { Components } from '@mui/material';
import { breakpoints } from './BasicTypography';
import { LgFontSizes, MdFontSizes, SmFontSizes, XlFontSizes, XsFontSizes } from './FontSizes';

const ListItemText: Components['MuiListItemText'] = {
  styleOverrides: {
    root: {
      '& .MuiTypography-root': {
        [breakpoints.down('sm')]: {
          fontSize: XsFontSizes.sidebar
        },
        [breakpoints.up('sm')]: {
          fontSize: SmFontSizes.sidebar
        },
        [breakpoints.up('md')]: {
          fontSize: MdFontSizes.sidebar
        },
        [breakpoints.up('lg')]: {
          fontSize: LgFontSizes.sidebar,
        },
        [breakpoints.only('xl')]: {
          fontSize: XlFontSizes.sidebar
        },
        fontWeight: 400,
      }
    },
  }
};

export default ListItemText;
