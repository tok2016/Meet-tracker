import { Input, Paper } from '@mui/material';
import { useReducer, useState } from 'react';

import { SpeakerWithIndex } from '../../types/SpeakerContent';
import { breakpoints } from '../../theme/BasicTypography';
import { LgFontSizes, SmFontSizes, XlFontSizes, XsFontSizes } from '../../theme/FontSizes';
import TextArea from '../TextArea';
import TopicButtonsMenu from './TopicButtonsMenu';

type SpeakerPlainProps = {
  speaker: SpeakerWithIndex,
  commitChanges: (speaker: SpeakerWithIndex) => void,
  deleteSpeaker: (speakerIndex: number) => void,
  onKeyDown: () => void
};

const SpeakerPlain = ({speaker, commitChanges, deleteSpeaker, onKeyDown}: SpeakerPlainProps) => {
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
            [breakpoints.down('sm')]: {
              fontSize: XsFontSizes.h4
            },
            [breakpoints.up('sm')]: {
              fontSize: SmFontSizes.h4
            },
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
          onChange={(evt) => setInfo(evt.target.value)}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          >
        </TextArea>

        <TopicButtonsMenu 
          isRolledDown={isRolledDown} 
          onTopicRoll={rollPlain}
          onTopicDelete={() => deleteSpeaker(speaker.index)} />
    </Paper>
  )
};

export default SpeakerPlain;
