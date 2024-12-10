import { createAsyncThunk } from '@reduxjs/toolkit';

import CustomColorPalette from '../../types/CustomColorPalette';
import { AsyncThunkConfig } from '../store';
import { camelToSnake, snakeToCamel } from '../../utils/utils';
import AxiosInstance from '../../utils/Axios';
import LogoQuery from '../../types/LogoQuery';
import Logo from '../../assets/Logo.png';

const postColorPalette = createAsyncThunk<CustomColorPalette, CustomColorPalette, AsyncThunkConfig>(
  'palette/postColorPalette',
  async (palette, {getState}) => {
    const {user} = getState();
    
    try {
      const body = camelToSnake(palette);

      const response = await AxiosInstance.post('/color_settings', body, {
        headers: {
          Authorization: user.auth.token
        }
      });

      return snakeToCamel<CustomColorPalette>(response.data);
    } catch {
      return snakeToCamel<CustomColorPalette>(palette);
    }
  }
);

const getColorPalette = createAsyncThunk<[CustomColorPalette, string], void, AsyncThunkConfig>(
  'palette/getColorPalette',
  async (_, {getState}) => {
    const {palette: paletteState} = getState();

    const paletteResponse = await AxiosInstance.get('/color_settings');
    const palette = snakeToCamel<CustomColorPalette>(paletteResponse.data);

    console.log(palette);

    try {
      const logoResponse = await AxiosInstance.get('/logo', {
        responseType: 'blob'
      });

      if(paletteState.logo) {
        URL.revokeObjectURL(paletteState.logo);
      }

      const logo = URL.createObjectURL(logoResponse.data);

      return [palette, logo];
    } catch {
      return [palette, Logo];
    }
  }
);

const postLogo = createAsyncThunk<string, LogoQuery, AsyncThunkConfig>(
  'palette/postLogo',
  async (logo, {getState}) => {
    const {user, palette} = getState();

    try {
      const formData = new FormData();
      formData.append('file', logo.file);

      await AxiosInstance.post('/logo', formData, {
        headers: {
          Authorization: user.auth.token
        }
      });

      if(palette.logo) {
        URL.revokeObjectURL(palette.logo);
      }
    } finally {
      return logo.url;
    }
  }
);

export {getColorPalette, postColorPalette, postLogo};
