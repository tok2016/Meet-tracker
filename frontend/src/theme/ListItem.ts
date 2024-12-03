import { Components } from '@mui/material';

import UIColors, {getCssVariable} from '../utils/Colors';

const ListItem: Components['MuiListItem'] = {
  styleOverrides: {
    root: {
      padding: 0,
      '& .MuiListItemButton-root.Mui-selected': {
        background: UIColors.secondaryGradient(),
        color: getCssVariable('textMain')
      },
      '& .MuiListItemButton-root.Mui-selected:hover': {
        background: getCssVariable('main'),
        color: getCssVariable('textMain')
      }
    }
  }
};

export default ListItem;
