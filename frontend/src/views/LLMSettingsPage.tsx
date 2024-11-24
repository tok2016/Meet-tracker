import { Stack, Typography } from '@mui/material';

import useMediaMatch from '../hooks/useMediaMacth';
import TextArea from '../components/TextArea';
import JSONTable from '../components/JSONTable';
import defaultSchema from '../utils/defaultSchema.json';
import LLMPanel from '../components/LLMPanel';

const LLMSettingsPage = () => {
  const {small} = useMediaMatch();

  return (
    <Stack
      display='flex'
      flexDirection='column'
      gap='30px'
      alignItems='center'
      width='80%'>
        <div>
          <Typography variant='h2'>
            Конфигурации LLM
          </Typography>

          <div style={{
            display: 'grid',
            gridTemplateColumns: small ? '1fr' : '1fr 1fr',
            columnGap: '4vw',
            rowGap: '3.3vh'
          }}>
            {Array.from({length: 4}).map((_v, i) => (
              <LLMPanel key={Date.now() + i}/>
            ))}
          </div>
        </div>

        <div>
          <Typography variant='h2'>
            Промпт
          </Typography>

          <TextArea
            value=''
            variant='body1'
            hidden={false}
            readOnly={false}
            setter={() => {}}
            onKeyDown={() => {}}
            onKeyUp={() => {}}>
          </TextArea>
        </div>

        <div>
          <Typography variant='h2'>
            Структура JSON-документа резюме
          </Typography>
          <JSONTable jsonSchema={defaultSchema}/>
        </div>
    </Stack>
  );
};

export default LLMSettingsPage;
