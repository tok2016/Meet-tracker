import { Components } from '@mui/material';
import {getCssVariable} from '../utils/Colors';

const Table: Components['MuiTable'] = {
  styleOverrides: {
    root: {
      backgroundColor: getCssVariable('background')
    }
  }
};

export default Table;
