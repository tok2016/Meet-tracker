import { Components } from '@mui/material';

import UIColors from '../utils/Colors';

const ListItem: Components['MuiListItem'] = {
  styleOverrides: {
    root: {
      padding: 0,
      '& .MuiListItemButton-root.Mui-selected': {
        background: UIColors.secondaryGradient(),
        color: UIColors.textMain
      },
      '& .MuiListItemButton-root.Mui-selected:hover': {
        background: `${UIColors.main}80`,
        color: UIColors.textMain
      }
    }
  }
};

export default ListItem;
