import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@mui/material';
import { memo } from 'react';

import JSONField, { defaultItemsField, JSONSchema } from '../types/JSONSchema';
import JSONFieldRow from './JSONFieldRow';
import JSONAddField from './JSONAddField';
import { generateKey } from '../utils/utils';

type JSONTableProps = {
  jsonSchema: JSONSchema,
  updateSchema: (updatedSchema: JSONSchema) => void
};

const JSONTableRaw = ({jsonSchema, updateSchema}: JSONTableProps) => {
  const updateField = (updatedField: JSONField, key: string) => {
    updateSchema({...jsonSchema, [key]: updatedField});
  };

  const updateKey = (updatedKey: string, key: string) => {
    const newSchema = {
      ...jsonSchema,
      [updatedKey]: jsonSchema[key]
    };
    delete newSchema[key];

    updateSchema(newSchema);
  };

  const deleteField = (key: string) => {
    const newSchema = jsonSchema;
    delete newSchema[key];

    updateSchema(newSchema);
  };

  const addField = () => {
    const key = generateKey();
    updateSchema({...jsonSchema, [key]: defaultItemsField});
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell width='30%'>Ключ</TableCell>
          <TableCell width='30%'>Описание</TableCell>
          <TableCell width='20%'>Тип</TableCell>
          <TableCell width='20%'></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {Object.entries(jsonSchema).map((entry) => (
          <JSONFieldRow 
            key={entry[1].id} 
            jsonKey={entry[0]} 
            jsonField={entry[1]}
            updateField={updateField}
            updateKey={updateKey}
            deleteField={deleteField}
            addField={addField} />
        ))}
      </TableBody>

      <TableFooter>
        <JSONAddField onAddClick={addField} />
      </TableFooter>
    </Table>
  );
};

const JSONTable = memo(JSONTableRaw);

export default JSONTable;
