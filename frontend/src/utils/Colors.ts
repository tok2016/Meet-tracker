import { ColorPaletteVariables } from '../types/ColorPaletteVariables';
import CustomColorPalette from '../types/CustomColorPalette';

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

class Palette {
  private _palette: CustomColorPalette;
  private _variables: ColorPaletteVariables = {
    main: '--main',
    secondary: '--secondary',
    tertiary: '--tertiary',
    quaternary: '--quaternary',
    disabled: '--disabled',
    background: '--background',
    textMain: '--text-main',
    textSecondary: '--text-secondary',
    textHighlight: '--text-highlight',
    textContrast: '--text-contrast',
    error: '--error',
    semiTransparent: '--semi-transparent'
  };

  constructor(palette: CustomColorPalette) {
    this._palette = palette;
    /*Object.entries(this._variables).map(([key, variable]) => {
      document.documentElement.style.setProperty(variable, palette[key as keyof CustomColorPalette]);
    });
    document.documentElement.style.setProperty(this._variables.semiTransparent, `${palette.main}80`);*/
  };

  public get palette(): CustomColorPalette {
    return this._palette;
  };

  private set palette(newPalette: CustomColorPalette) {
    this._palette = newPalette;
  };

  public get variables(): ColorPaletteVariables {
    return this._variables;
  };

  public mainGradient() {
    return `linear-gradient(to right, var(${this.variables.main}), var(${this.variables.secondary}))`;
  };

  public secondaryGradient() {
    return `linear-gradient(to right, var(${this.variables.semiTransparent}), transparent)`;
  };

  public mainHoverGradient() {
    return `linear-gradient(to right, var(${this.variables.secondary}), var(${this.variables.secondary}))`;
  };

  public updatePalette(updatedPalette: CustomColorPalette) {
    this.palette = updatedPalette;
    Object.entries(this.variables).map(([key, variable]) => {
      document.documentElement.style.setProperty(variable, updatedPalette[key as keyof CustomColorPalette]);
    });
    document.documentElement.style.setProperty(this.variables.semiTransparent, `${updatedPalette.main}80`);
  };
};

const UIColors = new Palette(CustomColors);

const getCssVariable = (key: keyof ColorPaletteVariables) => `var(${UIColors.variables[key]})`;

export default UIColors;
export {CustomColors, getCssVariable};
