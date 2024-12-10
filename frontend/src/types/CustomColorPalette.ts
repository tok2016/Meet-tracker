import { HexColor } from './HexColor'

export default interface CustomColorPalette {
  mainColor: HexColor,
  secondaryColor: HexColor,
  tertiaryColor: HexColor,
  quaternaryColor: HexColor,
  disabledColor: HexColor,
  backgroundColor: HexColor,
  textMainColor: HexColor,
  textSecondaryColor: HexColor,
  textHighlightColor: HexColor,
  textContrastColor: HexColor,
  errorColor: HexColor
};
