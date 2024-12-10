import { Components } from '@mui/material';

import UIColors, {getCssVariable} from '../utils/Colors';

const ListItem: Components['MuiListItem'] = {
  styleOverrides: {
    root: {
      padding: 0,
      '& .MuiListItemButton-root.Mui-selected': {
        background: UIColors.secondaryGradient(),
        color: getCssVariable('textMainColor')
      },
      '& .MuiListItemButton-root.Mui-selected:hover': {
        background: getCssVariable('semiTransparentColor'),
        color: getCssVariable('textMainColor')
      }
    }
  }
};

export default ListItem;
