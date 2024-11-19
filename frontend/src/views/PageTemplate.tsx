import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import { DRAWER_WIDTH } from '../utils/theme/Drawer';
import { Box } from '@mui/material';
import useMediaValue from '../hooks/useMediaValue';
import { AVATAR_WIDTH } from '../utils/utils';

const PageTemplate = () => {
  const marginTop = useMediaValue(AVATAR_WIDTH);

  return (
    <>
      <Sidebar />
      <Box sx={{
        marginTop: `calc(${marginTop}px + 8vh)`,
        marginBottom: '50px',
        marginLeft: `calc(${DRAWER_WIDTH} + 3.1vw)`,
        marginRight: '3.1vw'
      }}>
        <Outlet />
      </Box>
    </>
  );
};

export default PageTemplate;
