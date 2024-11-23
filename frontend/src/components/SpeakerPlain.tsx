import { Input, Paper } from '@mui/material';
import { useReducer, useState } from 'react';

import { SpeakerWithIndex } from '../types/SpeakerContent';
import { breakpoints } from '../theme/BasicTypography';
import { LgFontSizes, XlFontSizes } from '../theme/FontSizes';
import TextArea from './TextArea';
import RollDownButton from './RollDownButton';

type SpeakerPlainProps = {
  speaker: SpeakerWithIndex,
  commitChanges: (speaker: SpeakerWithIndex) => void
  onKeyDown: () => void
};

const SpeakerPlain = ({speaker, commitChanges, onKeyDown}: SpeakerPlainProps) => {
  const [name, setName] = useState<string>(speaker.speakerName);
  const [info, setInfo] = useState<string>(speaker.speakerInfo);

  const [isRolledDown, rollPlain] = useReducer((value) => !value, false);

  const onKeyUp = () => {
    commitChanges({
      speakerName: name,
      speakerInfo: info,
      index: speaker.index
    });
  };

  return (
    <Paper variant='elevationSmall'
      sx={(theme) => theme.components?.MuiPaper ? ({
        position: 'relative',
        display: 'flex',
        flexDirection: isRolledDown ? 'column' : 'row',
        justifyContent: 'center',
        gap: '15px'
      }) : {}}>
        <Input
          type='text' 
          disableUnderline
          fullWidth
          value={name}
          itemType=''
          onChange={(evt) => setName(evt.target.value)}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          hidden={false}
          sx={{
            fontWeight: 700,
            [breakpoints.up('lg')]: {
              fontSize: LgFontSizes.h4
            },
            [breakpoints.only('xl')]: {
              fontSize: XlFontSizes.h4
            }
        }} />

        <TextArea
          variant='body1'
          value={info}
          readOnly={false}
          hidden={!isRolledDown}
          setter={setInfo}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          >
        </TextArea>

        <RollDownButton isRolledDown={isRolledDown} rollPlain={rollPlain} />
    </Paper>
  )
};

export default SpeakerPlain;
