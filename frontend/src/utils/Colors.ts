import {UIColorPalette, TextColorPalette} from './types/ColotPalette';

const UIColors: UIColorPalette = {
  main: '#F59D0E',
  secondary: '#F56B00',
  tertiary: '#F5F5F5',
  background: '#FFFFFF',
  mainGradient() {
    return `linear-gradient(to right, ${this.main}, ${this.secondary})`;
  },
  secondaryGradient() {
    return `linear-gradient(to right, ${this.main}, transparent)`;
  }
};

const TextColors: TextColorPalette = {
  main: '#000000',
  secondary: '#8B8B8B',
  highlight: UIColors.main,
  contrast: '#FFFFFF'
}

export {UIColors, TextColors};
