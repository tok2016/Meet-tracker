import { Button, Stack, Switch, TextField, Typography } from '@mui/material';
import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormHolder from '../components/FormHolder';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { createRoom } from '../store/meetingSlice';
import FieldsGroup from '../components/FieldsGroup';

const MeetingFormPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [roomName, setRoomName] = useState<string>('');
  const [isAutoRecording, toggleAutoRecording] = useReducer((value) => !value, true);

  const onRoomCreate = () => {
    const id = Date.now().toString();

    dispatch(createRoom({
      id,
      name: roomName, 
      isAutoRecording
    }));

    navigate(`/room/${id}`);
  };

  return (
    <FormHolder>
      <div>
        <Typography variant='h2' marginBottom='3.5vh'>
          Создание встречи
        </Typography>

        <FieldsGroup>
          <TextField
            autoComplete='off'
            value={roomName}
            label='Название комнаты'
            onChange={(evt) => setRoomName(evt.target.value)} />

          <Stack
            display='flex'
            flexDirection='row'
            gap='10px'
            alignItems='center'>
              <Typography variant='h3' textAlign='left'>Автоматическая запись</Typography>
              <Switch 
                checked={isAutoRecording}
                onChange={toggleAutoRecording} />
          </Stack>
        </FieldsGroup>
      </div>

      <Button
        variant='containtedSecondary'
        onClick={onRoomCreate}>
          Создать
      </Button>
    </FormHolder>
  );
};

export default MeetingFormPage;
