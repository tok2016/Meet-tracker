import { Components } from '@mui/material';
import { UIColors } from '../utils/Colors';

const Table: Components['MuiTable'] = {
  styleOverrides: {
    root: {
      backgroundColor: UIColors.background
    }
  }
};

export default Table;
