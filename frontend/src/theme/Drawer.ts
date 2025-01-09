import { Components } from '@mui/material';
import {getCssVariable} from '../utils/Colors';
import { breakpoints } from './BasicTypography';
import { AVATAR_WIDTH } from '../theme/MediaValues';
import MediaValue from '../types/MediaValue';

const DRAWER_WIDTH: MediaValue = {
  xs: '60vw',
  sm: '60vw',
  md: '35vw',
  lg: '15.6vw',
  xl: '15.6vw'
};

const Drawer: Components['MuiDrawer'] = {
  defaultProps: {
    variant: 'permanent',
    anchor: 'left',
    elevation: 0
  },
  styleOverrides: {
    paper: {
      backgroundColor: getCssVariable('backgroundColor'),
      padding: 0,
      [breakpoints.down('sm')]: {
        paddingTop: AVATAR_WIDTH.xs,
        width: DRAWER_WIDTH.xs
      },
      [breakpoints.up('sm')]: {
        paddingTop: AVATAR_WIDTH.sm,
        width: DRAWER_WIDTH.sm
      },
      [breakpoints.up('md')]: {
        paddingTop: AVATAR_WIDTH.md,
        width: DRAWER_WIDTH.md
      },
      [breakpoints.up('lg')]: {
        paddingTop: `calc(${AVATAR_WIDTH.lg}px + 8vh)`,
        width: DRAWER_WIDTH.lg
      },
      [breakpoints.only('xl')]: {
        paddingTop: `calc(${AVATAR_WIDTH.xl}px + 8vh)`,
        width: DRAWER_WIDTH.xl
      },
      zIndex: 1
    }
  }
};

export default Drawer;
export {DRAWER_WIDTH};
