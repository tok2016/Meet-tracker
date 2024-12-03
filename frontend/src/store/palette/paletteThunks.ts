import { createAsyncThunk } from '@reduxjs/toolkit';

import CustomColorPalette from '../../types/CustomColorPalette';
import { AsyncThunkConfig } from '../store';
import { camelToSnake, snakeToCamel } from '../../utils/utils';
import AxiosInstance from '../../utils/Axios';
import { CustomColors } from '../../utils/Colors';

const postColorPalette = createAsyncThunk<CustomColorPalette, CustomColorPalette, AsyncThunkConfig>(
  'palette/postColorPalette',
  async (palette, {getState}) => {
    const {user} = getState();
    
    try {
      const body = camelToSnake(palette);

      const response = await AxiosInstance.post('/colors', body, {
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

const getColorPalette = createAsyncThunk<CustomColorPalette, void, AsyncThunkConfig>(
  'palette/getColorPalette',
  async () => {
    try {
      const response = await AxiosInstance.get('/colors');
      return snakeToCamel<CustomColorPalette>(response.data);
    } catch {
      return CustomColors;
    }
  }
);

export {getColorPalette, postColorPalette};
