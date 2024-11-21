import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

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
import { useAppSelector } from '../hooks/useAppDispatch';
import { selectUser } from '../store/user/userSlice';
import AdminTemplate from './AdminTemplate';
import { useEffect, useState } from 'react';

const Router = () => {
  const {user, auth} = useAppSelector(selectUser);

  const {pathname} = useLocation();
  const [defaultPath, setDefaultPath] = useState<string>('');
  const isAvailable = auth.token && user.username;

  useEffect(() => {
    const path = pathname === '/login' || pathname === '/register' ? '/account' : pathname;
    setDefaultPath(path);
  });

  return (
    <Routes>
      <Route path='/' element={<MainPage />} />

      <Route 
        path='/login' 
        element={isAvailable
          ? <Navigate to={defaultPath} /> 
          : <LoginPage />} />
      <Route 
        path='/register' 
        element={isAvailable 
          ? <Navigate to={defaultPath} /> 
          : <RegisterPage />} />

      <Route 
        path='/account' 
        element={isAvailable 
          ? <PageTemplate /> 
          : <Navigate to='/login' />}>
              <Route path='upload' element={<UploadPage />} />

              <Route path='recent' element={<SummariesListPage />} />

              <Route index element={<UserPage />} />
              <Route path='summary/:id' element={<SummaryPage />} />

              <Route 
                path='admin'
                element={user.isAdmin 
                  ? <AdminTemplate /> 
                  : <Navigate to={'/account'}/>}>
                      <Route index element={<SettingsPage />} />

                      <Route path='summaries' element={<SummariesListPage isForAdmin />} />
                      <Route path='summaries/:id' element={<SummaryPage />} />

                      <Route path='users' element={<UsersListPage />} />
                      <Route path='users/:id' element={<UserPage isForAdmin />} />
                      <Route path='addUser' element={<RegisterPage isForAdmin />} />
              </Route>
      </Route>
    </Routes>
  );
};

export default Router;
