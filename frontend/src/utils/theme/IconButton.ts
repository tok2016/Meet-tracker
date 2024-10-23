import { Components } from '@mui/material';
import { UIColors } from '../Colors';

const IconButton: Components['MuiIconButton'] = {
  styleOverrides: {
    colorPrimary: {
      padding: 0,
      '*': {
        color: UIColors.main
      }
    }
  }
};

export default IconButton;
