import { Components } from '@mui/material';
import { UIColors } from '../Colors';

const Drawer: Components['MuiDrawer'] = {
  defaultProps: {
    variant: 'permanent',
    anchor: 'left',
    elevation: 0
  },
  styleOverrides: {
    paper: {
      width: '15.6vw',
      backgroundColor: UIColors.background,
      paddingTop: '15vh',
      zIndex: 1
    }
  }
};

export default Drawer;
