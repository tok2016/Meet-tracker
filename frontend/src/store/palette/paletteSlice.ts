import { createSlice } from '@reduxjs/toolkit';

import PaletteState from '../../types/PaletteState';
import UIColors from '../../utils/Colors';
import { RootState } from '../store';
import { getColorPalette, postColorPalette, postLogo } from './paletteThunks';
import { isActionWithError } from '../../types/ActionWithError';
import Logo from '../../assets/Logo.png';
import { DefaultErrors, getErrorMessage } from '../../utils/Error';
import { POST_LOGO_ERRORS, POST_PALETTE_ERRORS } from './paletteErorrs';

const selectPalette = (state: RootState) => state.palette;

const initialState: PaletteState = {
  palette: UIColors.palette,
  logo: Logo,
  status: 'idle',
  error: undefined,
  logoError: undefined
};

const paletteSlice = createSlice({
  name: 'palette',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postColorPalette.pending, (state) => {
        state.status = 'pending';
        state.error = undefined;
      })
      .addCase(postColorPalette.fulfilled, (state, action) => {
        state.status = 'success';
        state.palette = action.payload;
        UIColors.updatePalette(action.payload);
      })
      .addCase(postColorPalette.rejected, (state, action) => {
        state.status = 'error';
        state.error = getErrorMessage(POST_PALETTE_ERRORS, action.error.code);
      })
      .addCase(getColorPalette.pending, (state) => {
        state.status = 'pending';
        state.error = undefined;
      })
      .addCase(getColorPalette.fulfilled, (state, action) => {
        state.status = 'success';

        const [palette, logo] = action.payload;
        state.palette = palette;
        state.logo = logo;

        UIColors.updatePalette(palette);
      })
      .addCase(postLogo.pending, (state) => {
        state.status = 'pending';
        state.logoError = undefined;
      })
      .addCase(postLogo.fulfilled, (state, action) => {
        state.status = 'success';
        state.logo = action.payload;
      })
      .addCase(postLogo.rejected, (state, action) => {
        state.status = 'error';
        state.logoError = getErrorMessage(POST_LOGO_ERRORS, action.error.code);
      })
      .addDefaultCase((state, action) => {
        if(isActionWithError(action)) {
          state.status = 'error';
          state.error = DefaultErrors['ERR_INTERNET_SERVER_ERROR'];
        }
      })
  }
});

export default paletteSlice.reducer;
export {selectPalette};
