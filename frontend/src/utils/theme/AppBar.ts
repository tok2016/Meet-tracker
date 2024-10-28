import { Components } from '@mui/material';
import { UIColors } from '../Colors';

const AppBar: Components['MuiAppBar'] = {
  defaultProps: {
    position: 'relative',
    variant: 'elevation'
  },
  styleOverrides: {
    root: {
      backgroundColor: UIColors.background,
      padding: '2vh 2.5vw',
      borderRadius: 0,
      zIndex: 2,
      '& .MuiToolbar-root': {
        padding: 0
      },
      position: 'relative'
    }
  }
};

export default AppBar;
