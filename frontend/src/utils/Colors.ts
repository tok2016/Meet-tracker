import {UIColorPalette, TextColorPalette} from './types/ColotPalette';

const UIColors: UIColorPalette = {
  main: '#F59D0E',
  secondary: '#F56B00',
  tertiary: '#F5F5F5',
  quaternary: '#E7E7E7',
  disabled: '#8B8B8B',
  background: '#FFFFFF',
  mainGradient() {
    return `linear-gradient(to right, ${this.main}, ${this.secondary})`;
  },
  secondaryGradient() {
    return `linear-gradient(to right, ${this.main}80, transparent)`;
  },
  mainHoverGradient() {
    return `linear-gradient(to right, ${this.secondary}, ${this.secondary})`;
  }
};

const TextColors: TextColorPalette = {
  main: '#000000',
  secondary: '#8B8B8B',
  highlight: UIColors.main,
  contrast: '#FFFFFF',
  error: '#EE1313'
};

export {UIColors, TextColors};
