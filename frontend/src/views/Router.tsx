import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import MainPage from './MainPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import UserPage from './UserPage';
import SummariesListPage from './SummariesListPage';
import SummaryPage from './SummaryPage';
import UsersListPage from './UsersListPage';
import SettingsPage from './SettingsPage';
import UploadPage from './UploadPage';
import AccountTemplate from './AccountTemplate';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { clearUserError, selectUser } from '../store/user/userSlice';
import AdminTemplate from './AdminTemplate';
import { selectDefaultPage, setDefaultPage } from '../store/pageSlice';
import ColorsSettingsPage from './ColorsSettingsPage';
import LLMSettingsPage from './LLMSettingsPage';
import STTSettingsPage from './STTSettingsPage';
import OtherSettingsPage from './OtherSettingsPage';
import { clearSummaryError } from '../store/summary/summarySlice';
import { clearAdminError } from '../store/admin/adminSlice';
import { clearSettingsError } from '../store/settings/settingsSlice';
import { clearPaletteError } from '../store/palette/paletteSlice';

const Router = () => {
  const {user, auth, wasLoggedOut} = useAppSelector(selectUser);
  const {defaultPage} = useAppSelector(selectDefaultPage);
  const dispatch = useAppDispatch();

  const {pathname} = useLocation();
  const isAvailable = auth.token && user.username;

  useEffect(() => {
    dispatch(setDefaultPage(pathname));
    dispatch(clearUserError());
    dispatch(clearSummaryError());

    if(user.isAdmin) {
      dispatch(clearAdminError());
      dispatch(clearSettingsError());
      dispatch(clearPaletteError());
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path='/' element={<MainPage />} />

      <Route 
        path='/login' 
        element={isAvailable
          ? <Navigate to={wasLoggedOut ? '/account' : defaultPage} /> 
          : <LoginPage />} />
      <Route 
        path='/register' 
        element={isAvailable 
          ? <Navigate to={defaultPage} /> 
          : <RegisterPage />} />

      <Route 
        path='/account' 
        element={isAvailable 
          ? <AccountTemplate /> 
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
                      <Route path='settings' element={<SettingsPage />}>
                        <Route index element={<Navigate to='colors' />}/>
                        <Route path='colors' element={<ColorsSettingsPage />} />
                        <Route path='llm' element={<LLMSettingsPage />} />
                        <Route path='stt' element={<STTSettingsPage />} />
                        <Route path='other' element={<OtherSettingsPage />} />
                      </Route>

                      <Route index element={<Navigate to='summaries'/>} />
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
