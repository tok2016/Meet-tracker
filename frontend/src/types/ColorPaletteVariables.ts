import CustomColorPalette from './CustomColorPalette';

export type ColorPaletteVariables = {[key in keyof CustomColorPalette | 'semiTransparent']: string};
