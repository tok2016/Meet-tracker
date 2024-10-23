import { useLocation } from 'react-router-dom';

import NavigationBar from '../components/NavigationBar';
import Sidebar from '../components/Sidebar';
import Router from './Router';

const PageLayout = () => {
  const {pathname} = useLocation();

  // soon it will be defined by logged in user
  const withoutSidebar = pathname.length < 2 || pathname.includes('login') || pathname.includes('register'); 

  return (
    <>
      <NavigationBar />
      <Sidebar isVisible={!withoutSidebar} />
      <Router />
    </>
  );
};

export default PageLayout;
