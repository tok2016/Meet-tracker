import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@mui/material';
import { memo } from 'react';

import JSONField, { JSONSchema } from '../types/JSONSchema';
import JSONFieldRow from './JSONFieldRow';
import JSONAddField from './JSONAddField';

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
            key={entry[0]} 
            jsonKey={entry[0]} 
            jsonField={entry[1]}
            updateField={updateField}
            updateKey={updateKey} />
        ))}
      </TableBody>

      <TableFooter>
        <JSONAddField />
      </TableFooter>
    </Table>
  );
};

const JSONTable = memo(JSONTableRaw);

export default JSONTable;
