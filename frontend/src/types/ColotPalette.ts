import CustomColorPalette from './CustomColorPalette';

export default interface ColorPalette extends CustomColorPalette {
  mainGradient: () => string,
  secondaryGradient: () => string,
  mainHoverGradient: () => string,
  updateColors: (customPalette: CustomColorPalette) => void
};
