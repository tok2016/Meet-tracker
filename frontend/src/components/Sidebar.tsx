import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarPage {
  name: string,
  path: string | ((id: string) => string),
  accessable: boolean
};

const sidebarPages: SidebarPage[] = [
  {
    name: 'Загрузить',
    path: '/upload',
    accessable: true
  },
  {
    name: 'Ваши записи',
    path: '/userSummaries',
    accessable: true
  },
  {
    name: 'Настройки',
    path: '/settings',
    accessable: false,
  },
  {
    name: 'Профиль',
    path: (id: string) => `/user/${id}`,
    accessable: true
  },
  {
    name: 'Все записи',
    path: '/allSummaries',
    accessable: false
  },
  {
    name: 'Пользователи',
    path: 'users',
    accessable: false
  }
];

const Sidebar = ({isVisible}: {isVisible: boolean}) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const [path, setPath] = useState<string>(pathname);

  const pages = sidebarPages.filter((page) => page.accessable);

  return (
    <Drawer hidden={!isVisible} variant='permanent'>
      <List>
        {pages.map((page) => {
          const pagePath = typeof page.path === 'function' ? page.path('1') : page.path;

          return (
            <ListItem key={pagePath}>
              <ListItemButton
                hidden={!page.accessable} 
                selected={path === pagePath}
                onClick={() => {
                  navigate(pagePath);
                  setPath(pagePath);
                }}>
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
