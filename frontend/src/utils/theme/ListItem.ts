import { Components } from '@mui/material';

import { TextColors, UIColors } from '../Colors';

const ListItem: Components['MuiListItem'] = {
  styleOverrides: {
    root: {
      padding: 0,
      '& .MuiListItemButton-root.Mui-selected': {
        backgroundColor: UIColors.main,
        color: TextColors.contrast
      },
      '& .MuiListItemButton-root.Mui-selected:hover': {
        backgroundColor: `${UIColors.main}80`,
        color: TextColors.contrast
      }
    }
  }
};

export default ListItem;
