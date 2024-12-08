import { Button, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import DatabaseSettings, { defaultDatabaseSettings } from '../types/DatabaseSettings';
import { TTLUnit, TTLUnits, TTLUnitTranslation } from '../types/TTLUnit';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSettings } from '../store/settings/settingsSlice';
import { getDatabaseSettings, postDatabaseSettings } from '../store/settings/settingsThunks';
import { areObjectsEqual } from '../utils/utils';

const MIN_TTL_VALUE = 0;
const MAX_TTL_VALUE = 100;

const DatabaseSettingsGroup = () => {
  const {database, status} = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const [dbSettings, setDBSettings] = useState<DatabaseSettings>(defaultDatabaseSettings);

  const disabled = useMemo(() => areObjectsEqual(database, dbSettings) || status === 'pending', [database, dbSettings]);

  const updateSettings = (update: Partial<DatabaseSettings>) => {
    setDBSettings((prev) => ({...prev, ...update}));
  };

  const onTTLValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(evt.target.value);

    if(value < MIN_TTL_VALUE) {
      value = MIN_TTL_VALUE;
    } else if (value > MAX_TTL_VALUE) {
      value = MAX_TTL_VALUE;
    }

    updateSettings({ttlValue: value});
  };

  const sendDatabaseSettings = (settings: DatabaseSettings) => {
    dispatch(postDatabaseSettings(settings));
  };

  useEffect(() => {
    dispatch(getDatabaseSettings());
  }, []);

  return (
    <>
      <Typography variant='h2'>
        Настройка базы данных
      </Typography>

      <Stack
        display='flex'
        flexDirection='row'
        gap='calc(5px + 1vw)'
        justifyContent='space-between'>
          <TextField
            variant='outlined'
            type='number'
            fullWidth
            value={dbSettings.ttlValue}
            placeholder='Срок хранение данных'
            onChange={onTTLValueChange} />
          
          <Select
            fullWidth
            value={dbSettings.ttlUnit}
            onChange={(evt) => updateSettings({ttlUnit: evt.target.value as TTLUnit})}>
              {TTLUnits.map((unit) => (
                <MenuItem key={unit} value={unit}>{TTLUnitTranslation[unit]}</MenuItem>
              ))}
          </Select>
      </Stack>

      <Button
        variant='containtedSecondary'
        disabled={disabled}
        onClick={() => sendDatabaseSettings(dbSettings)}>
          Сохранить
      </Button>
    </>
  );
};

export default DatabaseSettingsGroup;
