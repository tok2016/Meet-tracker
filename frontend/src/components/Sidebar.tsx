import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from '@mui/icons-material';

import Page from '../types/Page';
import { useAppSelector } from '../hooks/useAppDispatch';
import { selectUser } from '../store/user/userSlice';
import { breakpoints } from '../theme/BasicTypography';
import useMediaMatch from '../hooks/useMediaMacth';
import useMediaValue from '../hooks/useMediaValue';
import { AVATAR_WIDTH, SIDEBAR_BUTTON_WIDTH } from '../theme/MediaValues';
import UIColors from '../utils/Colors';

const sidebarPages: Page[] = [
  {
    name: 'Загрузить',
    path: '/account/upload',
    forAdmin: false
  },
  {
    name: 'Недавнее',
    path: '/account/recent',
    forAdmin: false
  },
  {
    name: 'Профиль',
    path: '/account',
    forAdmin: false
  },
  {
    name: 'Админ',
    path: '/account/admin/',
    forAdmin: true
  }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const [path, setPath] = useState<string>(pathname);
  const [isOpened, toggleOpen] = useReducer((value) => !value, false);

  const {user} = useAppSelector(selectUser);

  const {medium} = useMediaMatch();
  const marginTop = useMediaValue(AVATAR_WIDTH);
  const sidebarButtonWidth = useMediaValue(SIDEBAR_BUTTON_WIDTH);

  const pages = sidebarPages.filter((page) => user.isAdmin || !page.forAdmin);

  const onButtonPageClick = (pagePath: string) => {
    navigate(pagePath);
    setPath(pagePath);
    
    if(isOpened) {
      toggleOpen();
    }
  };

  useEffect(() => {
    setPath(pathname)
  }, [pathname]);

  return (
    <>
      <IconButton 
        color='secondary'
        onClick={toggleOpen}
        sx={(theme) => theme.components?.MuiIconButton 
        ? {
            ...theme.components.MuiIconButton,
            position: 'fixed',
            zIndex: 2,
            left: 0,
            top: `calc(${marginTop}px + 8vh)`,
            padding: '4px',
            backgroundColor: UIColors.palette.backgroundColor,
            borderRadius: '0 50% 50% 0',
            boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);',
            [breakpoints.up('lg')]: {
              display: 'none',
              margin: 0
            }
          } 
        : {}}>
            <Menu sx={{width: sidebarButtonWidth, height: sidebarButtonWidth}} />
      </IconButton>
      
      <Drawer 
        variant={medium ? 'temporary' : 'permanent'} 
        open={isOpened || !medium} 
        onClose={toggleOpen}>
          <List>
            {pages.map((page) => (
                <ListItem key={page.path}>
                  <ListItemButton
                    hidden={!user.isAdmin && page.forAdmin} 
                    selected={path === page.path || page.forAdmin && path.includes('admin')}
                    onClick={() => onButtonPageClick(page.path)}>
                    <ListItemText>
                      {page.name}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
