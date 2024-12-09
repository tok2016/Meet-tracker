import { Paper, Stack } from '@mui/material';
import { ReactNode } from 'react';

import useMediaValue from '../hooks/useMediaValue';
import { AVATAR_WIDTH, NAV_BAR_MARGIN_BOTTOM } from '../utils/utils';
import useMediaMatch from '../hooks/useMediaMacth';

const FormHolder = ({children, isForAdmin=false, isInner=false}: {children: ReactNode, isForAdmin?: boolean, isInner?: boolean}) => {
  const marginTop = useMediaValue(AVATAR_WIDTH);
  const navBarPaddingBottom = useMediaValue(NAV_BAR_MARGIN_BOTTOM);
  const {medium} = useMediaMatch();

  if(medium) {
    return (
      <Stack
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        margin={isInner ? '0' : '0 7vw'}
        marginTop={isForAdmin ? 0 : `calc(${marginTop}px + ${navBarPaddingBottom})`}
        height={`calc(95vh - ${marginTop}px - ${navBarPaddingBottom})`}>
          {children}
      </Stack>
    );
  }

  return (
    <Paper 
      sx={(theme) => (theme.components?.MuiPaper ? {
        ...theme.components.MuiPaper?.defaultProps?.sx,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '70vh',
        width: '25vw',
        minHeight: 'fit-content',
        margin: '0 auto',
        marginTop: isForAdmin ? 0 : `calc(${marginTop}px + 8vh)`
      } : {})}>
      {children}
    </Paper>
  );
};

export default FormHolder;
