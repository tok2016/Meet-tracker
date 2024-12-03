import { Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { STTDevices } from '../types/STTOutput';
import TextArea from '../components/TextArea';
import STTConfig, { defaultSTTConfig } from '../types/STTConfig';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSettings } from '../store/settings/settingsSlice';
import { getSTTConfig, postSTTSettings } from '../store/settings/settingsThunks';
import { STTModels } from '../types/STTSize';
import { STTComputeModels } from '../types/STTCompute';
import STTSettingSelect from '../components/STTSettingSelect';
import { DiarizeTypes } from '../types/DiarizeType';

const STTSettingsPage = () => {
  const [sttConfig, setSTTConfig] = useState<STTConfig>(defaultSTTConfig);
  
  const {stt} = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const changeSTTConfig = (update: Partial<STTConfig>) => {
    setSTTConfig((prev) => ({
      ...prev,
      ...update
    }));
  };

  const subminSettings = (update: STTConfig) => {
    dispatch(postSTTSettings(update));
  };

  useEffect(() => {
    dispatch(getSTTConfig());
  }, []);

  useEffect(() => {
    setSTTConfig(stt);
  }, [stt])

  return (
    <>
      <Typography variant='h2'>
        Конфигурация speech-to-text модели
      </Typography>

      <STTSettingSelect
        label='Тип диаризации'
        value={sttConfig.diarizeType}
        values={[...DiarizeTypes]}
        select={(value) => changeSTTConfig({diarizeType: value})} />

      <STTSettingSelect
        label='Модель Whisper'
        value={sttConfig.whisperModel}
        values={[...STTModels]}
        select={(value) => changeSTTConfig({whisperModel: value})} />

      <STTSettingSelect
        label='Устройство для работы Whisper'
        value={sttConfig.whisperDevice}
        values={[...STTDevices]}
        select={(value) => changeSTTConfig({whisperDevice: value})} />

      <STTSettingSelect
        label='Модель вычислений для Whisper'
        value={sttConfig.whisperCompute}
        values={[...STTComputeModels]}
        select={(value) => changeSTTConfig({whisperCompute: value})} />

      <Stack alignSelf='flex-start' width='100%'>
        <Typography variant='h3' textAlign='left'>
          Промпт
        </Typography>

        <TextArea 
          className='outlined'
          value={sttConfig.initialPrompt} 
          variant='body1' 
          hidden={false} 
          readOnly={false} 
          onChange={(evt) => changeSTTConfig({initialPrompt: evt.target.value})} 
          onKeyUp={() => {}} 
          onKeyDown={() => {}}>
        </TextArea>
      </Stack>

      <Button
        variant='contained'
        onClick={() => subminSettings(sttConfig)}>
          Сохранить
      </Button>
    </>
  );
};

export default STTSettingsPage;
