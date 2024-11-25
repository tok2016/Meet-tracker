import { Delete, KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material';
import { IconButton, Input, Stack, TableCell, TableRow } from '@mui/material';
import { useReducer } from 'react';

import JSONField from '../types/JSONSchema';
import TextArea from './TextArea';
import JSONTypeField from './JSONTypeField';
import { UIColors } from '../utils/Colors';
import JSONAddField from './JSONAddField';

type JSONFieldRowProps = {
  jsonField: JSONField | undefined, 
  jsonKey: string,
  hidden?: boolean,
  isInner?: boolean, 
  readOnlyTitle?: boolean,
  updateField: (updatedField: JSONField, key: string) => void,
  updateKey: (updatedKey: string, key: string) => void
}

const JSONFieldRow = ({jsonField, jsonKey, isInner=false, readOnlyTitle=false, hidden=false, updateField, updateKey}: JSONFieldRowProps) => {
  const [isOpened, toggleOpen] = useReducer((value) => !value, false);

  if(!jsonField || hidden) {
    return;
  }

  const changeFiled = (update: Partial<JSONField>) => {
    updateField({...jsonField, ...update}, jsonKey);
  };

  const updateItems = (updatedField: JSONField, _key: string) => {
    if(!jsonField.items) {
      return;
    }

    updateField({...jsonField, items: updatedField}, jsonKey);
  };

  const updateInnerField = (updatedField: JSONField, key: string) => {
    if(!jsonField.properties) {
      return;
    }

    updateField({...jsonField, properties: {...jsonField.properties, [key]: updatedField}}, jsonKey);
  };

  const updateInnerKey = (updatedKey: string, key: string) => {
    if(!jsonField.properties) {
      return;
    }

    const newField: JSONField = {
      ...jsonField,
      properties: {
        ...jsonField.properties,
        [updatedKey]: jsonField.properties[key]
      }
    };

    if(newField.properties) {
      delete newField.properties[key];
    }

    updateField(newField, jsonKey);
  };

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: isInner ? UIColors.quaternary : UIColors.background,
        }}>
        <TableCell align='left'>
          <Input
              type='text'
              disableUnderline
              value={jsonKey}
              readOnly={readOnlyTitle}
              onChange={(evt) => updateKey(evt.target.value, jsonKey)}
              sx={{
                width: '100%',
                height: '100%',
                border: 'none',
                '& .MuiInputBase-input': {
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }
              }} />
        </TableCell>

        <TableCell align='left'>
          <TextArea 
            value={jsonField.description ?? ''} 
            variant='body1' 
            hidden={false} 
            readOnly={false} 
            onChange={(evt) => changeFiled({description: evt.target.value})} 
            onKeyUp={() => {}} 
            onKeyDown={() => {}}>
          </TextArea>
        </TableCell>

        <TableCell align='left'>
          <JSONTypeField 
            value={jsonField.type}
            onSelect={(evt) => changeFiled({type: evt.target.value})} />
        </TableCell>
            
        <TableCell align='center'>
          <Stack
            display='flex'
            flexDirection='row'
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
        isInner
        updateField={updateItems}
        updateKey={updateKey}
        hidden={!isOpened} />
      {jsonField.properties && isOpened 
        ? <>
            {Object.entries(jsonField.properties).map((entry) => (
              <JSONFieldRow
                key={entry[0]} 
                jsonKey={entry[0]} 
                jsonField={entry[1]} 
                updateField={updateInnerField}
                updateKey={updateInnerKey}
                isInner />
            ))}
            <JSONAddField isInner/>
          </>
        : <></>}
    </>
  );
};

export default JSONFieldRow;
