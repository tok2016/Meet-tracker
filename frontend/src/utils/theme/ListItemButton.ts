import { Components } from '@mui/material';
import { TextColors, UIColors } from '../Colors';

const ListItemButton: Components['MuiListItemButton'] = {
  styleOverrides: {
    root: {
      backgroundColor: 'transparent',
      color: TextColors.main,
      height: '5em',
      paddingLeft: '2.5vw',
      ':hover': {
        backgroundColor: `${UIColors.main}80`,
        color: TextColors.contrast
      }
    }
  }
}

export default ListItemButton;
