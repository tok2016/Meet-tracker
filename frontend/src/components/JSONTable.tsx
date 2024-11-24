import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@mui/material';

import { JSONSchema } from '../types/JSONSchema';
import JSONFieldRow from './JSONFieldRow';
import JSONAddField from './JSONAddField';

const JSONTable = ({jsonSchema}: {jsonSchema: JSONSchema}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align='center'>Ключ</TableCell>
          <TableCell align='center'>Описание</TableCell>
          <TableCell align='center'>Тип</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {Object.entries(jsonSchema).map((entry, i) => (
          <JSONFieldRow key={Date.now() + i} jsonKey={entry[0]} jsonField={entry[1]} />
        ))}
      </TableBody>

      <TableFooter>
        <JSONAddField />
      </TableFooter>
    </Table>
  );
};

export default JSONTable;
