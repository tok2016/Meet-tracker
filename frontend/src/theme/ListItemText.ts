import { Components } from '@mui/material';
import { breakpoints } from './BasicTypography';

const ListItemText: Components['MuiListItemText'] = {
  styleOverrides: {
    root: {
      '& .MuiTypography-root': {
        [breakpoints.up('lg')]: {
          fontSize: 24,
        },
        [breakpoints.only('xl')]: {
          fontSize: 32
        },
        fontWeight: 400,
      }
    },
  }
};

export default ListItemText;
