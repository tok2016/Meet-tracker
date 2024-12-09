import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import useMediaMatch from '../hooks/useMediaMacth';
import LLMPanel from '../components/settings/LLMPanel';
import LLMSettings from '../types/LLMSettings';
import LLMConfig from '../types/LLMConfig';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSettings } from '../store/settings/settingsSlice';
import { getLLMConfigs, getLLMSettings, postLLMSettings } from '../store/settings/settingsThunks';

const LLMSettingsPage = () => {
  const {small} = useMediaMatch();

  const {llm, llms, status} = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const [settings, setSettings] = useState<LLMSettings>(llm);

  const disabled = llm.llmModel === settings.llmModel || status === 'pending';

  const chooseLLM = (llmConfig: LLMConfig) => {
    setSettings((prev) => ({...prev, llmModel: llmConfig.name}));
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
              selected={settings.llmModel === llm.name}
              onClick={() => chooseLLM(llm)} />
          ))}
        </div>
      </div>

      <Button 
        variant='contained'
        disabled={disabled}
        onClick={() => submitSettings(settings)}>
          Сохранить
      </Button>
    </>
  );
};

export default LLMSettingsPage;
