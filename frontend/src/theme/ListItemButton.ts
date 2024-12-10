import { Components } from '@mui/material';

import UIColors, {getCssVariable} from '../utils/Colors';

const ListItemButton: Components['MuiListItemButton'] = {
  styleOverrides: {
    root: {
      background: 'transparent',
      color: getCssVariable('textMainColor'),
      height: '4em',
      paddingLeft: '2.5vw',
      ':hover': {
        background: UIColors.secondaryGradient(),
        color: getCssVariable('textMainColor')
      }
    }
  }
}

export default ListItemButton;
