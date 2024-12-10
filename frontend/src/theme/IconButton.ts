import { Components } from '@mui/material';
import {getCssVariable} from '../utils/Colors';

const IconButton: Components['MuiIconButton'] = {
  styleOverrides: {
    colorPrimary: {
      padding: 0,
      '*': {
        color: getCssVariable('mainColor'),
      },
      ':hover *': {
        color: getCssVariable('secondaryColor')
      }
    },
    colorSecondary: {
      padding: 0,
      '*': {
        color: getCssVariable('textMainColor')
      },
      ':hover *': {
        color: getCssVariable('disabledColor')
      }
    }
  }
};

export default IconButton;
