import { Components } from '@mui/material';
import { getCssVariable } from '../utils/Colors';

const AppBar: Components['MuiAppBar'] = {
  defaultProps: {
    position: 'relative',
    variant: 'elevation'
  },
  styleOverrides: {
    root: {
      backgroundColor: getCssVariable('backgroundColor'),
      padding: '2vh 2.5vw',
      borderRadius: 0,
      zIndex: 2,
      '& .MuiToolbar-root': {
        padding: 0
      },
      position: 'fixed'
    }
  }
};

export default AppBar;
