import { Outlet } from 'react-router-dom';

import ButtonsTab from '../components/ButtonsTab';
import Page from '../types/Page';

const AdminSubpages: Page[] = [
  {
    name: 'Записи',
    path: '/account/admin/summaries',
    forAdmin: true
  },
  {
    name: 'Пользователи',
    path: '/account/admin/users',
    forAdmin: true
  },
  {
    name: 'Добавить пользователя',
    path: '/account/admin/addUser',
    forAdmin: true
  },
  {
    name: 'Настройки',
    path: '/account/admin',
    forAdmin: true
  }
];

const AdminTemplate = () => (
  <>
    <ButtonsTab pages={AdminSubpages} />
    <Outlet />
  </>
);

export default AdminTemplate;
