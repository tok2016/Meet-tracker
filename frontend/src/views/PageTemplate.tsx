import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import { DRAWER_WIDTH } from '../utils/theme/Drawer';

const PageTemplate = () => (
  <>
    <Sidebar />
    <div style={{
      margin: `4.2vh 3.1vw 0 calc(${DRAWER_WIDTH} + 3.1vw)`
    }}>
      <Outlet />
    </div>
  </>
);

export default PageTemplate;
