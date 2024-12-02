import { Components } from '@mui/material';
import UIColors from '../utils/Colors';

const IconButton: Components['MuiIconButton'] = {
  styleOverrides: {
    colorPrimary: {
      padding: 0,
      '*': {
        color: UIColors.main,
      },
      ':hover *': {
        color: UIColors.secondary
      }
    },
    colorSecondary: {
      padding: 0,
      '*': {
        color: UIColors.textMain
      },
      ':hover *': {
        color: UIColors.textHighlight
      }
    }
  }
};

export default IconButton;
