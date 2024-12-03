import { Components } from '@mui/material';
import {getCssVariable} from '../utils/Colors';

const Menu:Components['MuiMenu'] = {
  styleOverrides: {
    paper: {
      backgroundColor: getCssVariable('quaternary'),
      padding: '10px'
    }
  }
};

export default Menu;
