import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Page from '../utils/types/Page';
import { useAppSelector } from '../hooks/useAppDispatch';
import { selectUser } from '../store/user/userSlice';

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
    path: (username: string) => `/account/users/${username}`,
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

  const {user} = useAppSelector(selectUser);

  const pages = sidebarPages.filter((page) => !page.forAdmin);

  const onButtonPageClick = (pagePath: string) => {
    navigate(pagePath);
    setPath(pagePath);
  };

  return (
    <Drawer variant='permanent'>
      <List>
        {pages.map((page) => {
          const pagePath = typeof page.path === 'function' ? page.path(user.username) : page.path;

          return (
            <ListItem key={pagePath}>
              <ListItemButton
                hidden={page.forAdmin} 
                selected={path === pagePath}
                onClick={() => onButtonPageClick(pagePath)}>
                <ListItemText>
                  {page.name}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
