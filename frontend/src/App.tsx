import './App.css'
import '@fontsource-variable/inter/files/inter-cyrillic-wght-normal.woff2';
import '@fontsource-variable/inter/files/inter-cyrillic-standard-normal.woff2';
import '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2';
import '@fontsource-variable/inter/files/inter-latin-standard-normal.woff2';
import { ThemeProvider, THEME_ID } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import Router from './views/Router';
import Theme from './utils/theme/theme';

function App() {
  return (
    <ThemeProvider theme={{ [THEME_ID]: Theme }}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
