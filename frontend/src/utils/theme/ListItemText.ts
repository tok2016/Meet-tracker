import { Components } from '@mui/material';

const ListItemText: Components['MuiListItemText'] = {
  styleOverrides: {
    root: {
      '& .MuiTypography-root': {
        fontSize: 32,
        fontWeight: 400,
      }
    },
  }
};

export default ListItemText;
