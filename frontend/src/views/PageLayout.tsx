import { useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import Router from './Router';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectUser, setTokenFromStorage, setUserFromStorage } from '../store/user/userSlice';
import { getCurrentUser } from '../store/user/userThunks';

const PageLayout = () => {

  const {user, auth} = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!auth.token) {
      const savedToken = localStorage.getItem('auth');
      dispatch(setTokenFromStorage(savedToken));
    }
  }, [auth.token, dispatch]);

  useEffect(() => {
    if(!user.username) {
      const savedUser = sessionStorage.getItem('user');
      dispatch(setUserFromStorage(savedUser));
      if(!savedUser && auth.token) {
        dispatch(getCurrentUser());
      }
    }
  }, [user.username, auth.token, dispatch])

  return (
    <>
      <NavigationBar />
      <Router />
    </>
  );
};

export default PageLayout;
