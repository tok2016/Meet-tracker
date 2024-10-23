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

const Router = () => (
  <Routes>
    <Route path='/' element={<MainPage />} />

    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />

    <Route path='/users' element={<UsersListPage />} />
    <Route path='/user/:id' element={<UserPage />} />

    <Route path='/userSummaries' element={<SummariesListPage />} />
    <Route path='/allSummaries' element={<SummariesListPage />} />
    <Route path='/summary/:id' element={<SummaryPage />} />

    <Route path='/upload' element={<UploadPage />} />
    <Route path='/settings' element={<SettingsPage />} />
  </Routes>
);

export default Router;
