import { Paper, Stack, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

import { PAPER_SMALL_PADDING } from '../utils/utils';
import UIColors from '../utils/Colors';

const ItemPlainSx: SxProps<Theme> | undefined = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '20px',
  alignItems: 'center'
};

const ItemPlain = ({downMedium, children, menu}: {downMedium: boolean, children: ReactNode, menu: ReactNode}) => (
  downMedium
  ? <Stack sx={{...ItemPlainSx, width: '100%'}}>
      <Paper 
        variant='elevationSmall'
        sx={(theme) => (theme.components?.MuiPaper ? {
          ...theme.components.MuiPaper?.defaultProps?.sx,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '20px',
          alignItems: 'flex-start',
          width: '95%',
          ':hover a': {
            color: UIColors.palette.textHighlight,
            transition: 'color 0.15s'
          }
        } : {})}>
          {children}
      </Paper>
      {menu}
    </Stack>
  : <Paper 
      variant='elevationSmall'
      sx={(theme) => (theme.components?.MuiPaper ? {
        ...ItemPlainSx,
        ...theme.components.MuiPaper?.defaultProps?.sx,
        width: `calc(100% - 2 * ${PAPER_SMALL_PADDING.lg})`,
        ':hover a': {
          color: UIColors.palette.textHighlight,
          transition: 'color 0.15s'
        }
      } : {})}>
        {children}
    </Paper>  
);

export default ItemPlain;
