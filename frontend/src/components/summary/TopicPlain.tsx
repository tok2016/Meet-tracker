import { Button, Paper, Stack } from '@mui/material';
import { memo, useMemo, useReducer, useState } from 'react';

import SpeakerPlain from './SpeakerPlain';
import TopicContent from '../../types/TopicContent';
import TextArea from '../TextArea';
import TopicButtonsMenu from './TopicButtonsMenu';
import { defaultSpeaker, SpeakerWithIndex } from '../../types/SpeakerContent';
import useMediaMatch from '../../hooks/useMediaMacth';
import TopicTimeCodes from './TopicTimeCodes';
import TopicInput from './TopicInput';

const TYPE_TIMEOUT = 2500;

type TopicPlainProps = {
  index: number,
  content: TopicContent, 
  entireDuration: number,
  updateSummary: (index: number, updatedContent: Partial<TopicContent> | undefined) => void,
};

const TopicPlainRaw = ({index, content, entireDuration, updateSummary}: TopicPlainProps) => {
  const [isRolledDown, rollPlain] = useReducer((value) => !value, false);

  const speakers = useMemo(() => (
    content.speakers.map((speaker, i): SpeakerWithIndex => ({...speaker, index: i}))
  ), [content]);

  const [customTitle, setCustomTitle] = useState<string>(content.topic);
  const [customText, setCustomText] = useState<string>(content.text);

  const {medium} = useMediaMatch();

  let timer: number | undefined = undefined;

  const commitChanges = (topic: string, text: string) => {
    timer = setTimeout(() => {
      updateSummary(index, {topic, text});
    }, TYPE_TIMEOUT);
  };

  const commitSpeakerChanges = (speaker: SpeakerWithIndex) => {
    timer = setTimeout(() => {
      updateSummary(index, {
        speakers: [...content.speakers.slice(0, speaker.index), speaker, ...content.speakers.slice(speaker.index + 1)]
      });
    }, TYPE_TIMEOUT);
  };
  
  const deleteSpeaker = (speakerIndex: number) => {
    updateSummary(index, {
      speakers: [...content.speakers.slice(0, speakerIndex), ...content.speakers.slice(speakerIndex + 1)]
    });
  };

  const commitTimeCodesChange = (start: string, end: string) => {
    updateSummary(index, {start, end});
  };

  const onNewSpeakerAdd = () => {
    updateSummary(index, {speakers: content.speakers.concat(defaultSpeaker)});
  };

  const onKeyUp = () => {
    commitChanges(customTitle, customText);
  };

  const onKeyDown = () => {
    clearTimeout(timer);
  };

  if(!content.topic) {
    return;
  }

  return (
    <Paper 
      variant='elevationSmall'
      sx={(theme) => (theme.components?.MuiPaper ? {
        ...theme.components.MuiPaper?.defaultProps?.sx,
        marginBottom: '20px',
        position: 'relative',
        display: 'flex',
        flexDirection: isRolledDown ? 'column' : 'row',
        justifyContent: 'center',
        gap: '15px'
      } : {})}>
          <Stack 
            display='flex' 
            flexDirection='row' 
            alignItems='center' 
            alignSelf='center' 
            gap='10px' 
            justifyContent='center'
            width='100%'>
              <TopicInput
                type='text'
                value={customTitle}
                width={`${customTitle.length / 1.5}em`}
                onChange={(evt) => setCustomTitle(evt.target.value)}
                onKeyUp={onKeyUp}
                onKeyDown={onKeyDown} />

              <TopicTimeCodes 
                start={content.start} 
                end={content.end}
                entireDuration={entireDuration}
                hidden={medium} 
                commitChange={commitTimeCodesChange} />
          </Stack>

          <TopicTimeCodes 
            start={content.start} 
            end={content.end}
            entireDuration={entireDuration}
            hidden={!medium || !isRolledDown} 
            commitChange={commitTimeCodesChange} />

          <TextArea 
            readOnly={false}
            variant='body1'
            hidden={!isRolledDown} 
            value={customText}
            onChange={(evt) => setCustomText(evt.target.value)}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}>
          </TextArea>

          <Paper variant='elevationInside' style={{
            display: isRolledDown ? 'flex' : 'none',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {speakers.map((speaker) => (
              <SpeakerPlain 
                key={speaker.index} 
                speaker={speaker} 
                onKeyDown={onKeyDown} 
                commitChanges={commitSpeakerChanges}
                deleteSpeaker={deleteSpeaker} />
            ))}

            <Button 
              variant='topic' 
              fullWidth
              onClick={onNewSpeakerAdd}>
                +
            </Button>
          </Paper>

          <TopicButtonsMenu 
            isRolledDown={isRolledDown} 
            onTopicRoll={rollPlain} 
            onTopicDelete={() => updateSummary(index, undefined)}/>
    </Paper>
  );
};

const TopicPlain = memo(TopicPlainRaw);

export default TopicPlain;
