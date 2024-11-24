import { Add } from '@mui/icons-material';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { UIColors } from '../utils/Colors';

const JSONAddField = ({isInner=false}: {isInner?: boolean}) => (
  <TableRow
    sx={{
      backgroundColor: isInner ? UIColors.quaternary : UIColors.background
    }}>
      <TableCell>
        <IconButton color='secondary'>
          <Add />
        </IconButton>
      </TableCell>
  </TableRow>
);

export default JSONAddField;
