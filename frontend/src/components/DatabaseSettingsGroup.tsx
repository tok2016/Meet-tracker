import { Input, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import DatabaseSettings, { defaultDatabaseSettings } from '../types/DataBaseSettings';
import { TTLUnit, TTLUnits, TTLUnitTranslation } from '../types/TTLUnit';

const DatabaseSettingsGroup = () => {
  const [dbSettings, setDBSettings] = useState<DatabaseSettings>(defaultDatabaseSettings);

  const updateSettings = (update: Partial<DatabaseSettings>) => {
    setDBSettings((prev) => ({...prev, ...update}));
  };

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
          <Input
            type='number'
            fullWidth
            value={dbSettings.ttlValue}
            onChange={(evt) => updateSettings({ttlValue: parseInt(evt.target.value)})}
            placeholder='Срок хранение данных' />
          
          <Select
            value={dbSettings.ttlUnit}
            onChange={(evt) => updateSettings({ttlUnit: evt.target.value as TTLUnit})}>
              {TTLUnits.map((unit) => (
                <MenuItem key={unit} value={unit}>{TTLUnitTranslation[unit]}</MenuItem>
              ))}
          </Select>
      </Stack>
    </>
  );
};

export default DatabaseSettingsGroup;
