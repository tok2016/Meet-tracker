import CustomColorPalette from '../types/CustomColorPalette';
import ColorPalette from '../types/ColotPalette';

const CustomColors: CustomColorPalette = {
  main: '#F59D0E',
  secondary: '#F56B00',
  tertiary: '#F5F5F5',
  quaternary: '#E7E7E7',
  disabled: '#8B8B8B',
  background: '#FFFFFF',
  textMain: '#000000',
  textSecondary: '#8B8B8B',
  textHighlight: '#F59D0E',
  textContrast: '#FFFFFF',
  error: '#EE1313'
};

const UIColors: ColorPalette = {
  ...CustomColors,
  mainGradient() {
    return `linear-gradient(to right, ${this.main}, ${this.secondary})`;
  },
  secondaryGradient() {
    return `linear-gradient(to right, ${this.main}80, transparent)`;
  },
  mainHoverGradient() {
    return `linear-gradient(to right, ${this.secondary}, ${this.secondary})`;
  },
  updateColors(palette) {
    Object.entries(palette).forEach((entry) => {
      this[entry[0] as keyof CustomColorPalette] = entry[1];
    });
  }
};

export default UIColors;
export {CustomColors};
