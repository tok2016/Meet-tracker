import { Typography } from '@mui/material';
import { useState } from 'react';

import SettingSelect from './SettingSelect';
import EmailSettings, { defaultEmailSettings } from '../types/EmailSettings';
import { EmailProtocols } from '../types/EmailProtocol';
import UploadPlain from './UploadPlain';
import { useAppSelector } from '../hooks/useAppDispatch';
import { selectSettings } from '../store/settings/settingsSlice';
import TextArea from './TextArea';
import UIColors from '../utils/Colors';
import SettingTextArea from './SettingTextArea';

const EmailSettingsGroup = () => {
  const {status} = useAppSelector(selectSettings);

  const [file, setFile] = useState<File | undefined>();
  const [emailSettings, setEmailSettings] = useState<EmailSettings>(defaultEmailSettings);
  const [error, setError] = useState<string | undefined>();

  const updateSettings = (update: Partial<EmailSettings>) => {
    setEmailSettings((prev) => ({...prev, ...update}));
  };

  const setMarkupFile = async (markupFile: File | undefined) => {
    if(!markupFile) {
      return;
    }

    const markup = await markupFile.text();

    if(markup.includes('</script>')) {
      setError('Не допускается использование тега script');
    } else {
      updateSettings({markup});
      setError(undefined);
      setFile(markupFile);
    }
  };

  return (
    <>
      <Typography variant='h2'>
        Настройки интеграции с электронной почтой
      </Typography>
      
      <SettingSelect 
        label='Протокол для доступа к электронной почте' 
        value={emailSettings.protocol} 
        values={[...EmailProtocols]} 
        select={(value) => updateSettings({protocol: value})} />

      <UploadPlain
        hideSubmitButton 
        attentionText='Формат файла - HTML' 
        status={status} 
        file={file} 
        acceptedFormats='.html' 
        inputId='markup' 
        setFile={setMarkupFile} 
        onFileUpload={() => {}}>
          {error
            ? <Typography 
                variant='body2Highlight' 
                color={UIColors.palette.error}>
                  {error}
                </Typography>
            : <TextArea 
                className='outlined'
                value={emailSettings.markup} 
                variant='body1' 
                hidden={!emailSettings.markup} 
                readOnly 
                onKeyUp={() => {}} 
                onKeyDown={() => {}}>
              </TextArea>}
      </UploadPlain>

      <SettingTextArea
        label='Текст письма'
        value={emailSettings.text}
        onChange={(evt) => updateSettings({text: evt.target.value})} />
    </>
  );
};

export default EmailSettingsGroup;
