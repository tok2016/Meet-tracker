import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import { DRAWER_WIDTH } from '../theme/Drawer';
import { Box } from '@mui/material';
import useMediaValue from '../hooks/useMediaValue';
import { AVATAR_WIDTH } from '../utils/utils';
import { breakpoints } from '../theme/BasicTypography';

const AccountTemplate = () => {
  const marginTop = useMediaValue(AVATAR_WIDTH);

  return (
    <>
      <Sidebar />

      <Box sx={{
        marginBottom: '50px',
        [breakpoints.down('lg')]: {
          marginTop: 'calc(10px + 2.5vh)',
          marginRight: '7vw',
          marginLeft: '7vw'
        },
        [breakpoints.up('lg')]: {
          marginTop: `calc(${marginTop}px + 8vh)`,
          marginLeft: `calc(${DRAWER_WIDTH} + 3.1vw)`,
          marginRight: '3.1vw'
        }
      }}>
        <Outlet />
      </Box>
    </>
  );
};

export default AccountTemplate;
