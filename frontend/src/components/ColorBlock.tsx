import { MenuItem, Select, Stack, Typography } from '@mui/material';

import { HexColor } from '../types/HexColor';
import CustomColorPalette from '../types/CustomColorPalette';
import { ColorPaletteVariables } from '../types/ColorPaletteVariables';
import UIColors from '../utils/Colors';

type ColorBlockProps = {
  color: HexColor, 
  role: keyof CustomColorPalette, 
  colors: HexColor[],
  selectColor: (color: HexColor) => void
};

const RoleTranslations: ColorPaletteVariables = {
  main: 'Первичный',
  secondary: 'Вторичный',
  tertiary: 'Третичный',
  quaternary: 'Четвертичный',
  disabled: 'Отлкючённый',
  background: 'Фоновый',
  textMain: 'Основной текст',
  textSecondary: 'Второстепенный цвет',
  textHighlight: 'Выделенный текст',
  textContrast: 'Контрастный текст',
  error: 'Ошибочный',
  semiTransparent: 'Полупрозрачный'
};

const getContrastTextColor = (color: HexColor): HexColor => {
  const hexes = color.match(/[a-fA-F0-9]{2}/g);

  if(hexes) {
    const decimals = hexes.map((hex) => parseInt(hex, 16));
    const decimalsSum = decimals.reduce((prev, next) => prev + next, 0);

    return decimalsSum >= 400 ? UIColors.palette.textMain : UIColors.palette.textContrast;
  }

  return UIColors.palette.textMain;
}; 

const ColorBlock = ({color, role, colors, selectColor}: ColorBlockProps) => (
  <Stack display='block'>
    <Typography 
      variant='body1'
      fontWeight={700} 
      marginBottom={'calc(1vh + 5px)'}>
        {RoleTranslations[role]}
    </Typography>
    
    <Select 
      value={color}
      onChange={(evt) => selectColor(evt.target.value as HexColor)}
      style={{
        width: '100%',
        backgroundColor: color,
        color: getContrastTextColor(color)
      }}>
        {colors.map((hex) => (
          <MenuItem 
            key={hex} 
            value={hex}
            style={{
              backgroundColor: hex,
              color: getContrastTextColor(hex)
            }}>
              {hex}
          </MenuItem>
        ))}
    </Select>
  </Stack>
);

export default ColorBlock;
