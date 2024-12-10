import { SxProps, Theme } from '@mui/material';

import UIColors from '../../utils/Colors';

const iconSx: SxProps<Theme> = {
  color: UIColors.palette.textMainColor, 
  width: '1em', 
  height: '1em'
};

const subPlainsStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  gap: '1em',
  alignItems: 'center'
};

const innerSubPlainStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5em',
  alignItems: 'flex-start'
};

export {iconSx, subPlainsStyle, innerSubPlainStyle};
