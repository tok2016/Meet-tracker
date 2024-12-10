import { Button, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import SettingSelect from './SettingSelect';
import EmailSettings from '../../types/EmailSettings';
import { EmailProtocols } from '../../types/EmailProtocol';
import UploadPlain from '../UploadPlain';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { selectSettings } from '../../store/settings/settingsSlice';
import TextArea from '../TextArea';
import UIColors from '../../utils/Colors';
import SettingTextArea from './SettingTextArea';
import { getEmailSettings, postEmailSettings } from '../../store/settings/settingsThunks';
import { areObjectsEqual } from '../../utils/utils';

const EmailSettingsGroup = () => {
  const {email, status} = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<File | undefined>();
  const [emailSettings, setEmailSettings] = useState<EmailSettings>(email);
  const [error, setError] = useState<string | undefined>();

  const disabled = useMemo(() => areObjectsEqual(email, emailSettings) || status === 'pending', [email, emailSettings]);

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

  const sendEmailSettings = (settings: EmailSettings) => {
    dispatch(postEmailSettings(settings));
  }

  useEffect(() => {
    dispatch(getEmailSettings());
  }, [])

  return (
    <>
      <Typography variant='h2'>
        Настройки интеграции с электронной почтой
      </Typography>
      
      <Stack alignSelf='center'>
        <SettingSelect 
          label='Протокол для доступа к электронной почте' 
          value={emailSettings.protocol} 
          values={[...EmailProtocols]} 
          select={(value) => updateSettings({protocol: value})} />
      </Stack>

      <Stack>
        <Typography variant='h3' textAlign='center' marginBottom='5px'>
          Загрузка вёрстки письма
        </Typography>

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
                  color={UIColors.palette.errorColor}>
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
      </Stack>

      <SettingTextArea
        label='Текст письма'
        value={emailSettings.text}
        textAlign='center'
        onChange={(evt) => updateSettings({text: evt.target.value})} />

      <Button
        variant='containtedSecondary'
        disabled={disabled}
        onClick={() => sendEmailSettings(emailSettings)}>
          Сохранить
      </Button>
    </>
  );
};

export default EmailSettingsGroup;
