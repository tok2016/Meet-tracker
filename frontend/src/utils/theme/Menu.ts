import { Components } from '@mui/material';
import { UIColors } from '../Colors';

const Menu:Components['MuiMenu'] = {
  styleOverrides: {
    paper: {
      backgroundColor: UIColors.quaternary,
      padding: '10px'
    }
  }
};

export default Menu;
