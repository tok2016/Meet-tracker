import { Components } from '@mui/material';
import {getCssVariable} from '../utils/Colors';

const Menu:Components['MuiMenu'] = {
  styleOverrides: {
    paper: {
      backgroundColor: getCssVariable('quaternaryColor'),
      padding: '10px'
    }
  }
};

export default Menu;
