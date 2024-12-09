import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import { DRAWER_WIDTH } from '../theme/Drawer';
import { Box } from '@mui/material';
import useMediaValue from '../hooks/useMediaValue';
import { AVATAR_WIDTH, NAV_BAR_MARGIN_BOTTOM } from '../utils/utils';
import { breakpoints } from '../theme/BasicTypography';

const AccountTemplate = () => {
  const marginTop = useMediaValue(AVATAR_WIDTH);
  const navBarMargin = useMediaValue(NAV_BAR_MARGIN_BOTTOM);

  return (
    <>
      <Sidebar />

      <Box sx={{
        marginBottom: '50px',
        [breakpoints.down('lg')]: {
          marginTop: `calc(${marginTop}px + ${navBarMargin})`,
          marginRight: '7vw',
          marginLeft: '7vw'
        },
        [breakpoints.up('lg')]: {
          marginTop: `calc(${marginTop}px + 8vh)`,
          marginLeft: `calc(${DRAWER_WIDTH.lg} + 3.1vw)`,
          marginRight: '3.1vw'
        }
      }}>
        <Outlet />
      </Box>
    </>
  );
};

export default AccountTemplate;
