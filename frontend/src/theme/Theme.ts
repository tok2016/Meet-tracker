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
import UIColors from '../utils/Colors';
import List from './List';
import FilledInput from './FilledInput';
import Menu from './Menu';
import MenuItem from './MenuItem';
import Table from './Table';
import TableCell from './TableCell';

const Theme = createTheme({
  typography: BasicTypography,
  palette: {
    primary: {
      main: UIColors.main,
      light: UIColors.main,
      dark: UIColors.main,
      contrastText: UIColors.textContrast
    },
    secondary: {
      main: UIColors.background,
      light: UIColors.background,
      dark: UIColors.background,
      contrastText: UIColors.textMain
    },
    error: {
      main: UIColors.error,
      light: UIColors.error,
      dark: UIColors.error,
      contrastText: UIColors.textContrast
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
    MuiTable: Table,
    MuiTableCell: TableCell
  },
});

export default Theme;
