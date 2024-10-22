import { createTheme } from '@mui/material';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/cyrillic-400.css';
import '@fontsource/inter/cyrillic-700.css';

import Typography from './Typography';
import Button from './Button';
import TextField from './TextField';
import Paper from './Paper';
import AppBar from './AppBar';
import IconButton from './IconButton';
import { TextColors, UIColors } from '../Colors';
import OutlinedInput from './OutlinedInput';
import InputLabel from './InputLabel';
import Drawer from './Drawer';
import ListItemButton from './ListItemButton';
import ListItem from './ListItem';
import ListItemText from './ListItemText';
import Toolbar from './Toolbar';

const Theme = createTheme({
  typography: {
    fontFamily: 'Inter',
    button: {
      fontSize: 32,
      fontWeight: 400,
      textTransform: 'none',
      padding: 0,
      color: TextColors.contrast,
      backgroundColor: UIColors.main
    }
  },
  palette: {
    primary: {
      main: UIColors.main,
      light: UIColors.main,
      dark: UIColors.main,
      contrastText: TextColors.contrast
    },
    secondary: {
      main: UIColors.background,
      light: UIColors.background,
      dark: UIColors.background,
      contrastText: TextColors.main
    }
  },
  components: {
    MuiTypography: Typography,
    MuiButton: Button,
    MuiTextField: TextField,
    MuiPaper: Paper,
    MuiAppBar: AppBar,
    MuiIconButton: IconButton,
    MuiOutlinedInput: OutlinedInput,
    MuiInputLabel: InputLabel,
    MuiDrawer: Drawer,
    MuiListItem: ListItem,
    MuiListItemButton: ListItemButton,
    MuiListItemText: ListItemText,
    MuiToolbar: Toolbar
  },
});

export default Theme;
