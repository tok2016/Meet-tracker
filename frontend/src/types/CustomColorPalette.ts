import { HexColor } from './HexColor'

export default interface CustomColorPalette {
  main: HexColor,
  secondary: HexColor,
  tertiary: HexColor,
  quaternary: HexColor,
  disabled: HexColor,
  background: HexColor,
  textMain: HexColor,
  textSecondary: HexColor,
  textHighlight: HexColor,
  textContrast: HexColor,
  error: HexColor
};
