import { Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import UserPage from './UserPage';
import SummariesListPage from './SummariesListPage';
import SummaryPage from './SummaryPage';
import UsersListPage from './UsersListPage';
import SettingsPage from './SettingsPage';
import UploadPage from './UploadPage';
import PageTemplate from './PageTemplate';

const Router = () => (
  <Routes>
    <Route path='/' element={<MainPage />} />

    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />

    <Route path='/account' element={<PageTemplate />}>
      <Route path='upload' element={<UploadPage />} />

      <Route path='recent' element={<SummariesListPage />} />

      <Route path='users/:id' element={<UserPage />} />
      <Route path='summaries/:id' element={<SummaryPage />} />

      <Route path='admin'>
        <Route path='settings' element={<SettingsPage />} />
        <Route path='summaries' element={<SummariesListPage isAdmin />} />
        <Route path='users' element={<UsersListPage />} />
        <Route path='addUser' element={<RegisterPage />} />
      </Route>
    </Route>
  </Routes>
);

export default Router;
