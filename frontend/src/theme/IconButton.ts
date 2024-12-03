import { Components } from '@mui/material';
import {getCssVariable} from '../utils/Colors';

const IconButton: Components['MuiIconButton'] = {
  styleOverrides: {
    colorPrimary: {
      padding: 0,
      '*': {
        color: getCssVariable('main'),
      },
      ':hover *': {
        color: getCssVariable('secondary')
      }
    },
    colorSecondary: {
      padding: 0,
      '*': {
        color: getCssVariable('textMain')
      },
      ':hover *': {
        color: getCssVariable('textHighlight')
      }
    }
  }
};

export default IconButton;
