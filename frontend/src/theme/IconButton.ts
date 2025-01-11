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
    },
    colorWarning: {
      padding: 0,
      '*': {
        color: getCssVariable('errorColor'),
      },
      ':hover': {
        backgroundColor: getCssVariable('errorColor')
      },
      ':hover *': {
        color: getCssVariable('backgroundColor')
      }
    },
    colorInfo: {
      padding: 0,
      '*': {
        color: getCssVariable('textContrastColor')
      },
      ':hover': {
        backgroundColor: getCssVariable('textContrastColor')
      },
      ':hover *': {
        color: getCssVariable('textHighlightColor')
      }
    }
  }
};

export default IconButton;
