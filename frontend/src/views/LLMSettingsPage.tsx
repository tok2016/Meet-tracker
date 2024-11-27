import { Button, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

import useMediaMatch from '../hooks/useMediaMacth';
import TextArea from '../components/TextArea';
import JSONTable from '../components/JSONTable';
import LLMPanel from '../components/LLMPanel';
import { TextColors } from '../utils/Colors';
import LLMSettings from '../types/LLMSettings';
import { JSONSchema } from '../types/JSONSchema';
import LLMConfig from '../types/LLMConfig';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSettings } from '../store/settings/settingsSlice';
import { getLLMConfigs, getLLMSettings, postLLMSettings } from '../store/settings/settingsThunks';

const LLMSettingsPage = () => {
  const {small} = useMediaMatch();

  const {llm, llms} = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const [settings, setSettings] = useState<LLMSettings>(llm);

  const updateSchema = (updatedSchema: JSONSchema) => {
    setSettings((prev) => ({...prev, summaryStructure: updatedSchema}));
  };

  const chooseLLM = (llmConfig: LLMConfig) => {
    setSettings((prev) => ({...prev, ...llmConfig}));
  };

  const onPromptChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setSettings((prev) => ({...prev, prompt: evt.target.value}));
  };

  const submitSettings = (update: LLMSettings) => {
    dispatch(postLLMSettings(update));
  };

  useEffect(() => {
    dispatch(getLLMConfigs());
    dispatch(getLLMSettings());
  }, []);

  useEffect(() => {
    setSettings(llm);
  }, [llm])

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
          {llms.map((llm) => (
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
          className='outlined'
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

      <Button 
        variant='contained'
        onClick={() => submitSettings(settings)}>
          Сохранить
      </Button>
    </>
  );
};

export default LLMSettingsPage;
