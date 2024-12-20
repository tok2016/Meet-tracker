import { Button, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { STTDevices } from '../types/STTOutput';
import STTConfig, { defaultSTTConfig } from '../types/STTConfig';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSettings } from '../store/settings/settingsSlice';
import { getSTTConfig, postSTTSettings } from '../store/settings/settingsThunks';
import { STTModels } from '../types/STTSize';
import { STTComputeModels } from '../types/STTCompute';
import SettingSelect from '../components/settings/SettingSelect';
import { DiarizeTypes } from '../types/DiarizeType';
import SettingTextArea from '../components/settings/SettingTextArea';
import { areObjectsEqual } from '../utils/utils';
import ButtonContent from '../components/ButtonContent';

const STTSettingsPage = () => {
  const [sttConfig, setSTTConfig] = useState<STTConfig>(defaultSTTConfig);
  
  const {stt, status, sttError} = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const disabled = useMemo(() => areObjectsEqual(sttConfig, stt) || status === 'pending', [sttConfig, stt]);

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

      <SettingSelect
        label='Тип диаризации'
        value={sttConfig.diarizeType}
        values={[...DiarizeTypes]}
        select={(value) => changeSTTConfig({diarizeType: value})} />

      <SettingSelect
        label='Модель Whisper'
        value={sttConfig.whisperModel}
        values={[...STTModels]}
        select={(value) => changeSTTConfig({whisperModel: value})} />

      <SettingSelect
        label='Устройство для работы Whisper'
        value={sttConfig.whisperDevice}
        values={[...STTDevices]}
        select={(value) => changeSTTConfig({whisperDevice: value})} />

      <SettingSelect
        label='Модель вычислений для Whisper'
        value={sttConfig.whisperCompute}
        values={[...STTComputeModels]}
        select={(value) => changeSTTConfig({whisperCompute: value})} />

      <SettingTextArea 
        label='Промпт' 
        value={sttConfig.initialPrompt}
        textAlign='left'
        onChange={(evt) => changeSTTConfig({initialPrompt: evt.target.value})} />

      <Typography variant='error' textAlign='left'>{sttError}</Typography>

      <Button
        variant='contained'
        disabled={disabled}
        onClick={() => subminSettings(sttConfig)}>
          <ButtonContent content='Сохранить' status={status} />
      </Button>
    </>
  );
};

export default STTSettingsPage;
