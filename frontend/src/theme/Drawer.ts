import { Components } from '@mui/material';
import UIColors from '../utils/Colors';
import { breakpoints } from './BasicTypography';
import { AVATAR_WIDTH } from '../utils/utils';

const DRAWER_WIDTH = '15.6vw';

const Drawer: Components['MuiDrawer'] = {
  defaultProps: {
    variant: 'permanent',
    anchor: 'left',
    elevation: 0
  },
  styleOverrides: {
    paper: {
      width: DRAWER_WIDTH,
      backgroundColor: UIColors.background,
      padding: 0,
      [breakpoints.up('lg')]: {
        paddingTop: `calc(${AVATAR_WIDTH.lg}px + 8vh)`
      },
      [breakpoints.only('xl')]: {
        paddingTop: `calc(${AVATAR_WIDTH.xl}px + 8vh)`
      },
      zIndex: 1
    }
  }
};

export default Drawer;
export {DRAWER_WIDTH};
