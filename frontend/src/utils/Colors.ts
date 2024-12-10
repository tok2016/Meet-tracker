import { ColorPaletteVariables } from '../types/ColorPaletteVariables';
import CustomColorPalette from '../types/CustomColorPalette';

const CustomColors: CustomColorPalette = {
  mainColor: '#F59D0E',
  secondaryColor: '#F56B00',
  tertiaryColor: '#F5F5F5',
  quaternaryColor: '#E7E7E7',
  disabledColor: '#8B8B8B',
  backgroundColor: '#FFFFFF',
  textMainColor: '#000000',
  textSecondaryColor: '#8B8B8B',
  textHighlightColor: '#F59D0E',
  textContrastColor: '#FFFFFF',
  errorColor: '#EE1313'
};

class Palette {
  private _palette: CustomColorPalette;
  private _variables: ColorPaletteVariables = {
    mainColor: '--main-color',
    secondaryColor: '--secondary-color',
    tertiaryColor: '--tertiary-color',
    quaternaryColor: '--quaternary-color',
    disabledColor: '--disabled-color',
    backgroundColor: '--background-color',
    textMainColor: '--text-main-color',
    textSecondaryColor: '--text-secondary-color',
    textHighlightColor: '--text-highlight-color',
    textContrastColor: '--text-contrast-color',
    errorColor: '--error-color',
    semiTransparentColor: '--semi-transparent-color'
  };

  constructor(palette: CustomColorPalette) {
    this._palette = palette;
    /*Object.entries(this._variables).map(([key, variable]) => {
      document.documentElement.style.setProperty(variable, palette[key as keyof CustomColorPalette]);
    });
    document.documentElement.style.setProperty(this._variables.semiTransparentColor, `${palette.main}80`);*/
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
    return `linear-gradient(to right, var(${this.variables.mainColor}), var(${this.variables.secondaryColor}))`;
  };

  public secondaryGradient() {
    return `linear-gradient(to right, var(${this.variables.semiTransparentColor}), transparent)`;
  };

  public mainHoverGradient() {
    return `linear-gradient(to right, var(${this.variables.secondaryColor}), var(${this.variables.secondaryColor}))`;
  };

  public updatePalette(updatedPalette: CustomColorPalette) {
    this.palette = updatedPalette;
    Object.entries(this.variables).map(([key, variable]) => {
      document.documentElement.style.setProperty(variable, updatedPalette[key as keyof CustomColorPalette]);
    });
    document.documentElement.style.setProperty(this.variables.semiTransparentColor, `${updatedPalette.mainColor}80`);
  };
};

const UIColors = new Palette(CustomColors);

const getCssVariable = (key: keyof ColorPaletteVariables) => `var(${UIColors.variables[key]})`;

export default UIColors;
export {CustomColors, getCssVariable};
