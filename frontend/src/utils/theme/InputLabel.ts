import { Components } from '@mui/material';

import { TextColors } from '../Colors';

const InputLabel: Components['MuiInputLabel'] = {
  styleOverrides: {
    root: {
      color: TextColors.secondary,
      fontSize: 24,
      fontWeight: 400,
      top: '-0.1em'
    }
  }
};

export default InputLabel;
