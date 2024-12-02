import { MenuItem, Select, Stack, Typography } from '@mui/material';

import { HexColor } from '../types/HexColor';
import CustomColorPalette from '../types/ColotPalette';

type ColorBlockProps = {
  color: HexColor, 
  role: keyof CustomColorPalette, 
  colors: HexColor[],
  selectColor: (color: HexColor) => void
};

const ColorBlock = ({color, role, colors, selectColor}: ColorBlockProps) => (
  <Stack display='block'>
    <Typography 
      variant='body1' 
      fontWeight={700} 
      marginBottom={'calc(1vh + 5px)'}>
        {role}
    </Typography>
    
    <Select 
      value={color}
      onChange={(evt) => selectColor(evt.target.value as HexColor)}
      style={{
        width: '100%',
        backgroundColor: color
      }}>
        {colors.map((hex) => (
          <MenuItem 
            key={hex} 
            value={hex}
            style={{
              backgroundColor: hex,

            }}>
              {hex}
          </MenuItem>
        ))}
    </Select>
  </Stack>
);

export default ColorBlock;
