import { IconButton, Stack, SxProps } from '@mui/material';
import { Delete, KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material';

import { breakpoints } from '../../theme/BasicTypography';
import { PAPER_SMALL_PADDING } from '../../theme/MediaValues';
import useMediaMatch from '../../hooks/useMediaMacth';

type TopicButtonsMenuProps = {
  isRolledDown: boolean, 
  onTopicRoll: () => void,
  onTopicDelete: () => void
};

const TopicButtonsMenu = ({isRolledDown, onTopicRoll, onTopicDelete}: TopicButtonsMenuProps) => {
  const {medium} = useMediaMatch();

  const iconSx: SxProps = {
    width: '1.25em',
    height: '1.25em',
    [breakpoints.only('xl')]: {
      width: '1.75em',
      height: '1.75em',
      '*': {
        width: '80%',
        height: '80%'
      }
    }
  };

  return (
    <Stack
      display='flex'
      position={isRolledDown ? 'relative' : 'absolute'}
      alignSelf='flex-end'
      flexDirection='row'
      gap={medium ? '1px' : '5px'}
      alignItems='center'
      sx={{
        [breakpoints.down('md')]: {
          right: isRolledDown ? undefined : PAPER_SMALL_PADDING.sm,
          top: isRolledDown ? undefined : `calc(${PAPER_SMALL_PADDING.sm})`
        },
        [breakpoints.only('md')]: {
          right: isRolledDown ? undefined : PAPER_SMALL_PADDING.md,
          top: isRolledDown ? undefined : `calc(${PAPER_SMALL_PADDING.md})`
        },
        [breakpoints.up('lg')]: {
          right: isRolledDown ? undefined : PAPER_SMALL_PADDING.lg,
          top: isRolledDown ? undefined : `calc(${PAPER_SMALL_PADDING.lg})`
        }
      }}>
        <IconButton 
          color='warning'
          sx={iconSx} 
          onClick={onTopicDelete}>
            <Delete />
        </IconButton>
        <IconButton 
          color='secondary'
          sx={iconSx}  
          onClick={onTopicRoll}>
            {isRolledDown ? <KeyboardDoubleArrowUp /> : <KeyboardDoubleArrowDown />}
        </IconButton>
    </Stack>
  );
};

export default TopicButtonsMenu;
