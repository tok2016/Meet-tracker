import { MenuItem, Select, Stack, Switch, Typography } from '@mui/material';
import { useState } from 'react';

import { Language, MappedLanguages } from '../types/Language';
import { STTOutput, STTOutputFormats } from '../types/STTOutput';
import TextArea from '../components/TextArea';
import STTConfig, { defaultSTTConfig } from '../types/STTConfig';

const STTSettingsPage = () => {
  const [sttConfig, setSTTConfig] = useState<STTConfig>(defaultSTTConfig);
  
  const changeSTTConfig = (update: Partial<STTConfig>) => {
    setSTTConfig((prev) => ({
      ...prev,
      ...update
    }));
  };

  return (
    <>
      <Typography variant='h2'>
        Конфигурация speech-to-text модели
      </Typography>

      <Stack
        display='flex'
        flexDirection='row'
        gap='10px'
        alignSelf='flex-start'
        alignItems='center'>
          <Typography variant='h3' textAlign='left'>
            Кодировка аудиозаписи средствами ffmpeg 
          </Typography>
          <Switch 
            value={sttConfig.encode}
            onChange={(evt) => changeSTTConfig({encode: Boolean(evt.target.valueAsNumber)})} />
      </Stack>

      <Stack
        display='flex'
        flexDirection='row'
        gap='10px'
        alignSelf='flex-start'
        alignItems='center'>
          <Typography variant='h3' textAlign='left'>
            Распознавание времени слова в записи
          </Typography>
          <Switch 
            value={sttConfig.wordTimestamps}
            onChange={(evt) => changeSTTConfig({wordTimestamps: Boolean(evt.target.valueAsNumber)})} />
      </Stack>

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
    </>
  );
};

export default STTSettingsPage;
