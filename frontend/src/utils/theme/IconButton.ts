import { Components } from '@mui/material';
import { TextColors, UIColors } from '../Colors';

const IconButton: Components['MuiIconButton'] = {
  styleOverrides: {
    colorPrimary: {
      padding: 0,
      '*': {
        color: UIColors.main,
        width: '100%',
        height: '100%'
      }
    },
    colorSecondary: {
      padding: 0,
      '*': {
        color: TextColors.main,
        width: '100%',
        height: '100%'
      }
    }
  }
};

export default IconButton;
