import { Components } from '@mui/material';
import {getCssVariable} from '../utils/Colors';

const ListItemButton: Components['MuiListItemButton'] = {
  styleOverrides: {
    root: {
      backgroundColor: 'transparent',
      color: getCssVariable('textMain'),
      height: '4em',
      paddingLeft: '2.5vw',
      ':hover': {
        backgroundColor: getCssVariable('main'),
        color: getCssVariable('textContrast')
      }
    }
  }
}

export default ListItemButton;
