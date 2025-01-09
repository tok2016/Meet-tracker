import { Paper } from '@mui/material';
import { ReactNode } from 'react';

import { PAPER_SMALL_PADDING } from '../theme/MediaValues';
import UIColors from '../utils/Colors';
import useMediaValue from '../hooks/useMediaValue';

const ItemPlain = ({downMedium, isForAdmin, children}: {downMedium: boolean, isForAdmin: boolean, children: ReactNode}) => {
  const paperPadding = useMediaValue(PAPER_SMALL_PADDING);

  return (
    <Paper 
      variant='elevationSmall'
      sx={(theme) => (theme.components?.MuiPaper ? {
        ...theme.components.MuiPaper?.defaultProps?.sx,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '20px',
        alignItems: 'center',
        width: downMedium && isForAdmin ? `calc(95% - 2 * ${paperPadding})` : `calc(100% - 2 * ${paperPadding})`,
        ':hover a': {
          color: UIColors.palette.textHighlightColor,
          transition: 'color 0.15s'
        }
      } : {})}>
        {children}
    </Paper>  
  );
};

export default ItemPlain;
