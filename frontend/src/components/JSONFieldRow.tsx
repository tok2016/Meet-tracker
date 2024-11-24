import { Delete, KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material';
import { IconButton, Stack, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { useReducer } from 'react';

import JSONField from '../types/JSONSchema';
import TextArea from './TextArea';
import JSONTypeField from './JSONTypeField';
import { UIColors } from '../utils/Colors';
import JSONAddField from './JSONAddField';

type JSONFieldRowProps = {
  jsonField: JSONField | undefined, 
  jsonKey: string,
  isOpened?: boolean,
  toggleOpen?: () => void,
  isInner?: boolean, 
  readOnlyTitle?: boolean
}

const JSONFieldRow = ({jsonField, jsonKey, isInner=false, readOnlyTitle=false}: JSONFieldRowProps) => {
  const [isOpened, toggleOpen] = useReducer((value) => !value, false);

  if(!jsonField) {
    return;
  }

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: isInner ? UIColors.quaternary : UIColors.background
        }}>
        <TableCell align='left'>
          {readOnlyTitle 
          ? <Typography variant='body1'>
              {jsonKey}
            </Typography>
          : <TextField
              variant='outlined'
              value={jsonKey} />}
        </TableCell>

        <TableCell align='left'>
          <TextArea 
            value={jsonField.description ?? ''} 
            variant='body1' 
            hidden={false} 
            readOnly={false} 
            setter={() => {}} 
            onKeyUp={() => {}} 
            onKeyDown={() => {}}>
          </TextArea>
        </TableCell>

        <TableCell align='left'>
          <JSONTypeField value={jsonField.type} />
        </TableCell>
            
        <TableCell align='center'>
          <Stack
            display='flex'
            justifyContent='center'
            gap='10px'
            alignItems='center'>
              <IconButton color='secondary'>
                <Delete />
              </IconButton>

              <IconButton 
                color='secondary'
                onClick={toggleOpen}
                style={{
                  display: jsonField.type === 'object' || jsonField.type === 'array' ? 'inherit' : 'none'
                }}>
                  {isOpened ? <KeyboardDoubleArrowUp /> : <KeyboardDoubleArrowDown />}
              </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
      <JSONFieldRow 
        jsonKey='items' 
        jsonField={jsonField.items} 
        isInner />
      {jsonField.properties 
            ? <>
                {Object.entries(jsonField.properties).map((entry) => (
                  <JSONFieldRow
                    key={entry[0]} 
                    jsonKey={entry[0]} 
                    jsonField={entry[1]} 
                    isInner />
                ))}
                <JSONAddField isInner/>
              </>
            : <></>}
    </>
  );
};

export default JSONFieldRow;
