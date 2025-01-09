import { CloudOff, ContentPasteOff, NoAccounts } from '@mui/icons-material';
import { SxProps, Theme } from '@mui/material';

import useMediaValue from '../hooks/useMediaValue';
import { ERROR_ICON_WIDTH } from '../theme/MediaValues';
import { ErrorIconType } from '../types/ErrorIconType';

const ErrorIcon = ({type}: {type: ErrorIconType}) => {
  const errorIconWidth = useMediaValue(ERROR_ICON_WIDTH);

  const iconSx: SxProps<Theme> = {
    width: `${errorIconWidth}px`, 
    height: `${errorIconWidth}px`
  };

  switch(type) {
    case 'user':
      return <NoAccounts sx={iconSx} />
    case 'summary':
      return <ContentPasteOff sx={iconSx} />
    case 'settings':
      return <CloudOff sx={iconSx} />
  }
};

export default ErrorIcon;
