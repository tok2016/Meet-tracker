import CustomColorPalette from './CustomColorPalette';
import DefaultState from './DefaultState';

export default interface PaletteState extends DefaultState {
  palette: CustomColorPalette,
  logo: string,
  logoError: string | undefined
};
