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

  const {user} = useAppSelector(selectUser);

  const pages = sidebarPages.filter((page) => user.isAdmin || !page.forAdmin);

  const onButtonPageClick = (pagePath: string) => {
    navigate(pagePath);
    setPath(pagePath);
  };

  return (
    <Drawer variant='permanent'>
      <List>
        {pages.map((page) => (
            <ListItem key={page.path}>
              <ListItemButton
                hidden={!user.isAdmin && page.forAdmin} 
                selected={path === page.path}
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
  );
};

export default Sidebar;
