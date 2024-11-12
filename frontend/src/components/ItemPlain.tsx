import { Paper } from '@mui/material';
import { ReactNode } from 'react';

import { PAPER_SMALL_PADDING } from '../utils/theme/Paper';

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
        width: `calc(100% - 2 * ${PAPER_SMALL_PADDING})`
      } : {})}>
        {children}
    </Paper>
);

export default ItemPlain;
