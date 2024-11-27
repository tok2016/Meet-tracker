import { Paper } from '@mui/material';
import { ReactNode } from 'react';

import { PAPER_SMALL_PADDING } from '../theme/Paper';
import { TextColors } from '../utils/Colors';

const ItemPlain = ({children}: {children: ReactNode}) => (
  <Paper 
      variant='elevationSmall'
      sx={(theme) => (theme.components?.MuiPaper ? {
        ...theme.components.MuiPaper?.defaultProps?.sx,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '20px',
        alignItems: 'center',
        width: `calc(100% - 2 * ${PAPER_SMALL_PADDING})`,
        ':hover a': {
          color: TextColors.highlight,
          transition: 'color 0.15s'
        }
      } : {})}>
        {children}
    </Paper>
);

export default ItemPlain;
