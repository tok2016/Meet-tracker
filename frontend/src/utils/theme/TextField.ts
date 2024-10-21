import { Components } from '@mui/material';

import { UIColors, TextColors } from '../Colors';

const TextField: Components['MuiTextField'] = {
  defaultProps: {
    variant: 'outlined',
    fullWidth: true,
    slotProps: {
      input: {
        sx: {
          border: `solid 1px ${UIColors.tertiary}`,
          borderRadius: 10,
          backgroundColor: UIColors.background,
          color: TextColors.main,
          '::placeholder': {
            color: TextColors.secondary,
            fontFamily: 'Inter',
            fontSize: 24,
            fontWeight: 400
          },
        }
      }
    }
  }
};

export default TextField;
