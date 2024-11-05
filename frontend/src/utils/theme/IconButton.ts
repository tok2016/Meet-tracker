import { Components } from '@mui/material';
import { TextColors, UIColors } from '../Colors';

const IconButton: Components['MuiIconButton'] = {
  styleOverrides: {
    colorPrimary: {
      padding: 0,
      '*': {
        color: UIColors.main,
      },
      ':hover *': {
        color: UIColors.secondary
      },
      ':active *': {
        color: UIColors.quaternary
      }
    },
    colorSecondary: {
      padding: 0,
      '*': {
        color: TextColors.main
      },
      ':hover *': {
        color: TextColors.highlight
      },
      ':active *': {
        color: TextColors.secondary
      }
    }
  }
};

export default IconButton;
