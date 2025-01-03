import { useEffect, useState } from 'react';
import { createTheme, PaletteOptions, THEME_ID, ThemeProvider, Theme } from '@mui/material';
import { Outlet } from 'react-router-dom';

import NavigationBar from '../components/NavigationBar';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectUser, setTokenFromStorage, setUserFromStorage } from '../store/user/userSlice';
import { getCurrentUser, getCurrentUserAvatar } from '../store/user/userThunks';
import { getColorPalette } from '../store/palette/paletteThunks';
import { selectPalette } from '../store/palette/paletteSlice';
import DefaultTheme from '../theme/Theme';
import UIColors from '../utils/Colors';
import FullScreenProgress from '../components/FullScreenProgress';

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
          main: UIColors.palette.mainColor,
          light: UIColors.palette.mainColor,
          dark: UIColors.palette.mainColor,
          contrastText: UIColors.palette.textContrastColor
        },
        secondary: {
          main: UIColors.palette.backgroundColor,
          light: UIColors.palette.backgroundColor,
          dark: UIColors.palette.backgroundColor,
          contrastText: UIColors.palette.textMainColor
        },
        error: {
          main: UIColors.palette.errorColor,
          light: UIColors.palette.errorColor,
          dark: UIColors.palette.errorColor,
          contrastText: UIColors.palette.textContrastColor
        }
      };

      setTheme((prev) => createTheme({...prev, palette}));
    }
  }, [paletteStatus])

  if(paletteStatus === 'idle' || paletteStatus === 'pending') {
    return <FullScreenProgress />
  }

  return (
    <ThemeProvider theme={{ [THEME_ID]: theme }}>
      <NavigationBar />
      <Outlet />
    </ThemeProvider>
  );
};

export default PageLayout;
