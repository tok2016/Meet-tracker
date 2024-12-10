import { MenuItem, Select, Stack, Typography } from '@mui/material';
import { memo } from 'react';

import { HexColor } from '../../types/HexColor';
import CustomColorPalette from '../../types/CustomColorPalette';
import { ColorPaletteVariables } from '../../types/ColorPaletteVariables';
import UIColors from '../../utils/Colors';

type ColorRoleBlockProps = {
  color: HexColor, 
  role: keyof CustomColorPalette, 
  colors: HexColor[],
  selectColor: (color: HexColor) => void
};

const RoleTranslations: ColorPaletteVariables = {
  mainColor: 'Первичный',
  secondaryColor: 'Вторичный',
  tertiaryColor: 'Третичный',
  quaternaryColor: 'Четвертичный',
  disabledColor: 'Отлкючённый',
  backgroundColor: 'Фоновый',
  textMainColor: 'Основной текст',
  textSecondaryColor: 'Второстепенный цвет',
  textHighlightColor: 'Выделенный текст',
  textContrastColor: 'Контрастный текст',
  errorColor: 'Ошибочный',
  semiTransparentColor: 'Полупрозрачный'
};

const getContrastTextColor = (color: HexColor): HexColor => {
  const hexes = color.match(/[a-fA-F0-9]{2}/g);

  if(hexes) {
    const decimals = hexes.map((hex) => parseInt(hex, 16));
    const decimalsSum = decimals.reduce((prev, next) => prev + next, 0);

    return decimalsSum >= 400 ? UIColors.palette.textMainColor : UIColors.palette.textContrastColor;
  }

  return UIColors.palette.textMainColor;
}; 

const ColorRoleBlockRaw = ({color, role, colors, selectColor}: ColorRoleBlockProps) => (
  <Stack display='block'>
    <Typography 
      variant='body1'
      fontWeight={700} 
      marginBottom={'5px'}
      >
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

const ColorRoleBlock = memo(ColorRoleBlockRaw);

export default ColorRoleBlock;
