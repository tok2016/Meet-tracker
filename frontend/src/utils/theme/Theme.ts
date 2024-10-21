import { createTheme } from '@mui/material';
import Typography from './typography';
import Button from './Button';
import TextField from './Textfield';
import Paper from './Paper';

const Theme = createTheme({
  components: {
    MuiTypography: Typography,
    MuiButton: Button,
    MuiTextField: TextField,
    MuiPaper: Paper
  },
});

export default Theme;
