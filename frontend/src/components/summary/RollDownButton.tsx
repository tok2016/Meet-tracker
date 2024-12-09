import { TurnLeft, TurnRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import UIColors from '../../utils/Colors';
import { PAPER_SMALL_PADDING } from '../../utils/utils';
import { breakpoints } from '../../theme/BasicTypography';

const RollDownButton = ({isRolledDown, rollPlain}: {isRolledDown: boolean, rollPlain: () => void}) => (
  <IconButton
    sx={(theme) => theme.components?.MuiIconButton
    ? {
      ...theme.components.MuiIconButton,
      alignSelf: 'flex-end',
      width: '1.5em',
      height: '1.5em',
      position: isRolledDown ? 'relative' : 'absolute',
      [breakpoints.down('md')]: {
        right: isRolledDown ? undefined : PAPER_SMALL_PADDING.sm,
        top: isRolledDown ? undefined : `calc(${PAPER_SMALL_PADDING.sm} / 2)`
      },
      [breakpoints.only('md')]: {
        right: isRolledDown ? undefined : PAPER_SMALL_PADDING.md,
        top: isRolledDown ? undefined : `calc(${PAPER_SMALL_PADDING.md} / 2)`
      },
      [breakpoints.up('lg')]: {
        right: isRolledDown ? undefined : PAPER_SMALL_PADDING.lg,
        top: isRolledDown ? undefined : `calc(${PAPER_SMALL_PADDING.lg} / 2)`
      },
    } : {}}
    color='secondary'
    onClick={rollPlain}>
      {isRolledDown 
        ? <TurnLeft 
            sx={{
              rotate: '90deg',
              color: UIColors.palette.textMain
            }}/>
        : <TurnRight sx={{
            rotate: '90deg',
            color: UIColors.palette.textMain
          }}/>
      }
  </IconButton>        
);

export default RollDownButton;
