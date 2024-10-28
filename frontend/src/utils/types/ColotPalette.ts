type HexColor = `#${string}`;

export interface UIColorPalette {
  main: HexColor,
  secondary: HexColor,
  tertiary: HexColor,
  quaternary: HexColor,
  background: HexColor,
  mainGradient: () => string,
  secondaryGradient: () => string,
  mainHoverGradient: () => string
};

export interface TextColorPalette {
  main: HexColor,
  secondary: HexColor,
  highlight: HexColor,
  contrast: HexColor,
  error: HexColor
};
