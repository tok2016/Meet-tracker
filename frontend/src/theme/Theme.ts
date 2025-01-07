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
import OutlinedInput from './OutlinedInput';
import InputLabel from './InputLabel';
import Drawer from './Drawer';
import ListItemButton from './ListItemButton';
import ListItem from './ListItem';
import ListItemText from './ListItemText';
import Toolbar from './Toolbar';
import BasicTypography from './BasicTypography';
import List from './List';
import FilledInput from './FilledInput';
import Menu from './Menu';
import MenuItem from './MenuItem';
import FormHelperText from './FormHelperText';
import UIColors from '../utils/Colors';

const Theme = createTheme({
  typography: BasicTypography,
  palette: {
    primary: {
      main: UIColors.palette.mainColor,
      light: UIColors.palette.mainColor,
      dark: UIColors.palette.mainColor,
      contrastText: UIColors.palette.textContrastColor
    },
    secondary: {
      main: UIColors.palette.backgroundColor,
      light: UIColors.palette.backgroundColor,
      dark: UIColors.palette.backgroundColor,
      contrastText: UIColors.palette.textMainColor
    },
    error: {
      main: UIColors.palette.errorColor,
      light: UIColors.palette.errorColor,
      dark: UIColors.palette.errorColor,
      contrastText: UIColors.palette.textContrastColor
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
    MuiFilledInput: FilledInput,
    MuiInputLabel: InputLabel,
    MuiDrawer: Drawer,
    MuiListItem: ListItem,
    MuiListItemButton: ListItemButton,
    MuiListItemText: ListItemText,
    MuiToolbar: Toolbar,
    MuiList: List,
    MuiMenu: Menu,
    MuiMenuItem: MenuItem,
    MuiFormHelperText: FormHelperText
  },
});

export default Theme;
