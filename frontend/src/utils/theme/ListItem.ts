import { Components } from '@mui/material';

import { TextColors, UIColors } from '../Colors';

const ListItem: Components['MuiListItem'] = {
  styleOverrides: {
    root: {
      padding: 0,
      '& .css-14e8gxr-MuiButtonBase-root-MuiListItemButton-root.Mui-selected': {
        backgroundColor: UIColors.main,
        color: TextColors.contrast
      },
      '& .css-14e8gxr-MuiButtonBase-root-MuiListItemButton-root.Mui-selected:hover': {
        backgroundColor: `${UIColors.main}80`,
        color: TextColors.contrast
      }
    }
  }
};

export default ListItem;
