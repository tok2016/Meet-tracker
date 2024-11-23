import { Components } from '@mui/material';

import { TextColors, UIColors } from '../utils/Colors';

const ListItem: Components['MuiListItem'] = {
  styleOverrides: {
    root: {
      padding: 0,
      '& .MuiListItemButton-root.Mui-selected': {
        background: UIColors.secondaryGradient(),
        color: TextColors.main
      },
      '& .MuiListItemButton-root.Mui-selected:hover': {
        background: `${UIColors.main}80`,
        color: TextColors.main
      }
    }
  }
};

export default ListItem;
