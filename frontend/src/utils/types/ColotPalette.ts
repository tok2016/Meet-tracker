type HexColor = `#${string}`;

export interface UIColorPalette {
  main: HexColor,
  secondary: HexColor,
  tertiary: HexColor,
  background: HexColor,
  mainGradient: () => string,
  secondaryGradient: () => string
};

export interface TextColorPalette {
  main: HexColor,
  secondary: HexColor,
  highlight: HexColor,
  contrast: HexColor
};
