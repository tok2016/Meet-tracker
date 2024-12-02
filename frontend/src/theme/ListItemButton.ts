import { Components } from '@mui/material';
import UIColors from '../utils/Colors';

const ListItemButton: Components['MuiListItemButton'] = {
  styleOverrides: {
    root: {
      backgroundColor: 'transparent',
      color: UIColors.textMain,
      height: '4em',
      paddingLeft: '2.5vw',
      ':hover': {
        backgroundColor: `${UIColors.main}80`,
        color: UIColors.textContrast
      }
    }
  }
}

export default ListItemButton;
