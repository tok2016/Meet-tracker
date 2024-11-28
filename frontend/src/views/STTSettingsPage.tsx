import { Button, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { Language, MappedLanguages } from '../types/Language';
import { STTOutput, STTOutputFormats } from '../types/STTOutput';
import TextArea from '../components/TextArea';
import STTConfig, { defaultSTTConfig } from '../types/STTConfig';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSettings } from '../store/settings/settingsSlice';
import { getSTTConfig, postSTTSettings } from '../store/settings/settingsThunks';
import { STTSize, STTSizes } from '../types/STTSize';

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

      <Stack alignSelf='flex-start'>
        <Typography variant='h3' textAlign='left'>
          Язык возвращаемого текста
        </Typography>

        <Select 
          value={sttConfig.language}
          onChange={(evt) => changeSTTConfig({language: evt.target.value as Language})}>
            {Object.entries(MappedLanguages).map((entry) => (
              <MenuItem key={entry[0]} value={entry[0]}>{entry[1]}</MenuItem>
            ))}
        </Select>
      </Stack>

      <Stack alignSelf='flex-start'>
        <Typography variant='h3' textAlign='left'>
          Формат возвращаемого текста
        </Typography>

        <Select 
          value={sttConfig.output}
          onChange={(evt) => changeSTTConfig({output: evt.target.value as STTOutput})}>
            {STTOutputFormats.map((format) => (
              <MenuItem key={format} value={format}>{format}</MenuItem>
            ))}
        </Select>
      </Stack>

      <Stack alignSelf='flex-start'>
        <Typography variant='h3' textAlign='left'>
          Размер модели
        </Typography>

        <Select 
          value={sttConfig.modelSize}
          onChange={(evt) => changeSTTConfig({modelSize: evt.target.value as STTSize})}>
            {STTSizes.map((size) => (
              <MenuItem key={size} value={size}>{size}</MenuItem>
            ))}
        </Select>
      </Stack>

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
