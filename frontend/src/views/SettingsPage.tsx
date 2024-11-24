import { Outlet } from 'react-router-dom';
import ButtonsTab from '../components/ButtonsTab';
import Page from '../types/Page';

const SettingsPages: Page[] = [
  {
    name: 'Цветовая гамма',
    path: '/account/admin/settings/colors',
    forAdmin: true
  },
  {
    name: 'Настройки LLM',
    path: '/account/admin/settings/llm',
    forAdmin: true
  },
  {
    name: 'Настройки STT',
    path: '/account/admin/settings/stt',
    forAdmin: true
  },
  {
    name: 'Другое',
    path: '/account/admin/settings/other',
    forAdmin: true
  }
];

const SettingsPage = () => (
  <>
    <ButtonsTab pages={SettingsPages} />
    <Outlet />
  </>
);

export default SettingsPage;
