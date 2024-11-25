import { MenuItem, Select, Stack, Switch, Typography } from '@mui/material';

import { MappedLanguages } from '../types/Language';
import { STTOutputFormats } from '../types/STTOutput';
import TextArea from '../components/TextArea';

const STTSettingsPage = () => {
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
          <Switch />
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
          <Switch />
      </Stack>

      <Stack alignSelf='flex-start'>
        <Typography variant='h3' textAlign='left'>
          Язык возвращаемого текста
        </Typography>

        <Select value='en'>
          {Object.entries(MappedLanguages).map((entry) => (
            <MenuItem value={entry[0]}>{entry[1]}</MenuItem>
          ))}
        </Select>
      </Stack>

      <Stack alignSelf='flex-start'>
        <Typography variant='h3' textAlign='left'>
          Формат возвращаемого текста
        </Typography>

        <Select value='txt'>
          {STTOutputFormats.map((format) => (
            <MenuItem value={format}>{format}</MenuItem>
          ))}
        </Select>
      </Stack>

      <Stack alignSelf='flex-start' width='100%'>
        <Typography variant='h3' textAlign='left'>
          Промпт
        </Typography>

        <TextArea 
          value='' 
          variant='body1' 
          hidden={false} 
          readOnly={false} 
          onChange={() => {}} 
          onKeyUp={() => {}} 
          onKeyDown={() => {}}>
        </TextArea>
      </Stack>
    </>
  );
};

export default STTSettingsPage;
