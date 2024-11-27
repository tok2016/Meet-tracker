import { Add } from '@mui/icons-material';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { UIColors } from '../utils/Colors';

type JSONAddFieldProps = {
  isInner?: boolean,
  onAddClick: () => void
};

const JSONAddField = ({isInner=false, onAddClick}: JSONAddFieldProps) => (
  <TableRow
    sx={{
      backgroundColor: isInner ? UIColors.quaternary : UIColors.background
    }}>
      <TableCell align='center'>
        <IconButton 
          color='secondary'
          onClick={onAddClick}>
            <Add />
        </IconButton>
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
  </TableRow>
);

export default JSONAddField;
