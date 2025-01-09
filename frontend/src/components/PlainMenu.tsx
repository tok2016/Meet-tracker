import { Menu as MenuIcon, MoreVert } from '@mui/icons-material';
import { IconButton, Menu, Stack } from '@mui/material';
import { ReactNode, useState } from 'react';
import { breakpoints } from '../theme/BasicTypography';
import { PAPER_SMALL_PADDING } from '../theme/MediaValues';

const PlainMenu = ({children, downMedium, hidden=true}: {children: ReactNode, downMedium: boolean, hidden?: boolean}) => {
  const [anchor, setAnchor] = useState<HTMLElement | undefined>(undefined);

  if(hidden) {
    return;
  }

  return (
    <Stack sx={{
      [breakpoints.down('md')]: {
        position: 'absolute',
        right: `calc(-2.5 * ${PAPER_SMALL_PADDING.sm})`
      }
    }}>
      <IconButton 
        color='secondary' 
        sx={{width: '1em', height: '1em'}}
        onClick={(evt) => setAnchor(evt.currentTarget)}>
          {downMedium ? <MoreVert /> : <MenuIcon />}
      </IconButton>

      <Menu 
        open={anchor !== undefined}
        anchorEl={anchor} 
        onClose={() => setAnchor(undefined)}>
          {children}
      </Menu>
    </Stack>
  );
};

export default PlainMenu;
