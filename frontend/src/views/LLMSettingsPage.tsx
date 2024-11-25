import { Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';

import useMediaMatch from '../hooks/useMediaMacth';
import TextArea from '../components/TextArea';
import JSONTable from '../components/JSONTable';
import LLMPanel from '../components/LLMPanel';
import { TextColors } from '../utils/Colors';
import LLMs from '../utils/defaultLLMs.json';
import LLMSettings, { defaultLLMSettings } from '../types/LLMSettings';
import { JSONSchema } from '../types/JSONSchema';
import LLMConfig from '../types/LLMConfig';

const LLMSettingsPage = () => {
  const {small} = useMediaMatch();
  const [settings, setSettings] = useState<LLMSettings>(defaultLLMSettings);

  const updateSchema = (updatedSchema: JSONSchema) => {
    setSettings((prev) => ({...prev, summaryStructure: updatedSchema}));
  };

  const chooseLLM = (llmConfig: LLMConfig) => {
    setSettings((prev) => ({...prev, ...llmConfig}));
  };

  const onPromptChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setSettings((prev) => ({...prev, prompt: evt.target.value}));
  };

  return (
    <>
      <div style={{
        width: '100%'
      }}>
        <Typography variant='h2'>
          Конфигурации LLM
        </Typography>

        <div style={{
          display: 'grid',
          gridTemplateColumns: small ? '1fr' : '1fr 1fr',
          columnGap: '4vw',
          rowGap: '3.3vh'
        }}>
          {LLMs.map((llm) => (
            <LLMPanel 
              key={llm.digest} 
              llmConfig={llm} 
              selected={settings.name === llm.name}
              onClick={() => chooseLLM(llm)} />
          ))}
        </div>
      </div>

      <div style={{
        width: '100%'
      }}>
        <Typography variant='h2'>
          Промпт
        </Typography>

        <TextArea
          value={settings.prompt}
          variant='body1'
          hidden={false}
          readOnly={false}
          onChange={onPromptChange}
          onKeyDown={() => {}}
          onKeyUp={() => {}}>
        </TextArea>
      </div>

      <div style={{
        width: '100%'
      }}>
        <Typography variant='h2'>
          Структура JSON-документа резюме
        </Typography>
        <Typography variant='h3Normal' color={TextColors.error} textAlign='left'>
          Внимание! При изменении структуры документа необходимо срочно проводить работы на стороне клиентской части!
        </Typography>
        <JSONTable jsonSchema={settings.summaryStructure} updateSchema={updateSchema} />
      </div>
    </>
  );
};

export default LLMSettingsPage;
