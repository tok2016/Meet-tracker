import { Paper } from '@mui/material';
import { ReactNode } from 'react';

import { PAPER_SMALL_PADDING } from '../utils/utils';
import UIColors from '../utils/Colors';

const ItemPlain = ({downMedium, children}: {downMedium: boolean, children: ReactNode}) => (
  <Paper 
    variant='elevationSmall'
    sx={(theme) => (theme.components?.MuiPaper ? {
      ...theme.components.MuiPaper?.defaultProps?.sx,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '20px',
      alignItems: 'center',
      width: downMedium ? `calc(95% - 2 * ${PAPER_SMALL_PADDING.sm})` : `calc(100% - 2 * ${PAPER_SMALL_PADDING.lg})`,
      ':hover a': {
        color: UIColors.palette.textHighlightColor,
        transition: 'color 0.15s'
      }
    } : {})}>
      {children}
  </Paper>  
);

export default ItemPlain;
