import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

import ButtonsTab from '../components/ButtonsTab';
import Page from '../types/Page';
import { breakpoints } from '../theme/BasicTypography';

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
      sx={{
        'h2': {
          marginBottom: '20px'
        },
        [breakpoints.down('md')]: {
          width: '100%'
        },
        [breakpoints.up('md')]: {
          width: '80%',
          margin: '0 auto'
        }
      }}>
        <Outlet />
    </Stack>
  </>
);

export default SettingsPage;
