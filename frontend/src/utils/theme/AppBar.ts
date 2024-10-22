import { Components } from '@mui/material';
import { UIColors } from '../Colors';

const AppBar: Components['MuiAppBar'] = {
  defaultProps: {
    position: 'static',
    variant: 'elevation'
  },
  styleOverrides: {
    root: {
      backgroundColor: UIColors.background,
      padding: '2vh 2.5vw',
      zIndex: 2,
      '& .MuiToolbar-root': {
        padding: 0
      }
    }
  }
};

export default AppBar;
