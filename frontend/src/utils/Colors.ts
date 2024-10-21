import {UIColorPalette, TextColorPalette} from './types/ColotPalette';

const UIColors: UIColorPalette = {
  main: '#F59D0E',
  secondary: '#F56B00',
  tertiary: '#F5F5F5',
  background: '#FFFFFF'
};

const TextColors: TextColorPalette = {
  main: '#000000',
  secondary: '#8B8B8B',
  highlight: UIColors.main,
  contrast: '#FFFFFF'
}

export {UIColors, TextColors};
