type HexColor = `#${string}`;

export interface UIColorPalette {
  main: HexColor,
  secondary: HexColor,
  tertiary: HexColor,
  background: HexColor,
};

export interface TextColorPalette {
  main: HexColor,
  secondary: HexColor,
  highlight: HexColor,
  contrast: HexColor
};
