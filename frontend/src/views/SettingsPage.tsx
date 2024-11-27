import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

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
    <Stack
      display='flex'
      flexDirection='column'
      gap='40px'
      alignItems='center'
      width='80%'
      margin='0 auto'
      sx={{
        'h2': {
          marginBottom: '20px'
        }
      }}>
        <Outlet />
    </Stack>
  </>
);

export default SettingsPage;
