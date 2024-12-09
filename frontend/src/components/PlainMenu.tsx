import { Menu as MenuIcon, MoreVert } from '@mui/icons-material';
import { IconButton, Menu } from '@mui/material';
import { ReactNode, useState } from 'react';

const PlainMenu = ({children, downMedium, hidden=true}: {children: ReactNode, downMedium: boolean, hidden?: boolean}) => {
  const [anchor, setAnchor] = useState<HTMLElement | undefined>(undefined);

  if(hidden) {
    return;
  }

  return (
    <>
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
    </>
  );
};

export default PlainMenu;
