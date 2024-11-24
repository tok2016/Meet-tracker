import { TurnLeft, TurnRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { TextColors } from '../utils/Colors';
import { PAPER_SMALL_PADDING } from '../theme/Paper';

const RollDownButton = ({isRolledDown, rollPlain}: {isRolledDown: boolean, rollPlain: () => void}) => (
  <IconButton
    style={{
      alignSelf: 'flex-end',
      width: '1.5em',
      height: '1.5em',
      position: isRolledDown ? 'relative' : 'absolute',
      right: isRolledDown ? undefined : PAPER_SMALL_PADDING,
      top: isRolledDown ? undefined : `calc(${PAPER_SMALL_PADDING} / 2)`,
    }}
    color='secondary'
    onClick={rollPlain}>
      {isRolledDown 
        ? <TurnLeft 
            sx={{
              rotate: '90deg',
              color: TextColors.main
            }}/>
        : <TurnRight sx={{
            rotate: '90deg',
            color: TextColors.main
          }}/>
      }
  </IconButton>        
);

export default RollDownButton;
