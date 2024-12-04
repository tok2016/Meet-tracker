import { useEffect, useState } from 'react';
import { CircularProgress, createTheme, PaletteOptions, THEME_ID, ThemeProvider, Theme } from '@mui/material';

import NavigationBar from '../components/NavigationBar';
import Router from './Router';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectUser, setTokenFromStorage, setUserFromStorage } from '../store/user/userSlice';
import { getCurrentUser, getCurrentUserAvatar } from '../store/user/userThunks';
import { getColorPalette } from '../store/palette/paletteThunks';
import { selectPalette } from '../store/palette/paletteSlice';
import DefaultTheme from '../theme/Theme';
import UIColors from '../utils/Colors';

const PageLayout = () => {
  const {user, auth, status} = useAppSelector(selectUser);
  const {status: paletteStatus} = useAppSelector(selectPalette);
  const dispatch = useAppDispatch();

  const [theme, setTheme] = useState<Theme>(DefaultTheme);

  useEffect(() => {
    dispatch(getColorPalette());
  }, []);

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
      if(!savedUser && auth.token && status !== 'error' && status !== 'pending') {
        dispatch(getCurrentUser());
      }
    }
  }, [user.username, auth.token, status, dispatch])

  useEffect(() => {
    if(auth.token) {
      dispatch(getCurrentUserAvatar());
    }
  }, [auth.token, dispatch]);

  useEffect(() => {
    if(paletteStatus === 'success') {
      const palette: PaletteOptions = {
        primary: {
          main: UIColors.palette.main,
          light: UIColors.palette.main,
          dark: UIColors.palette.main,
          contrastText: UIColors.palette.textContrast
        },
        secondary: {
          main: UIColors.palette.background,
          light: UIColors.palette.background,
          dark: UIColors.palette.background,
          contrastText: UIColors.palette.textMain
        },
        error: {
          main: UIColors.palette.error,
          light: UIColors.palette.error,
          dark: UIColors.palette.error,
          contrastText: UIColors.palette.textContrast
        }
      };

      setTheme((prev) => createTheme({...prev, palette}));
    }
  }, [paletteStatus])

  if(paletteStatus === 'idle' || paletteStatus === 'pending') {
    return <CircularProgress />
  }

  return (
    <ThemeProvider theme={{ [THEME_ID]: theme }}>
      <NavigationBar />
      <Router />
    </ThemeProvider>
  );
};

export default PageLayout;
