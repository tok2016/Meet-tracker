import './App.css'
import { ThemeProvider, THEME_ID } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import Theme from './utils/theme/Theme';
import PageLayout from './views/PageLayout';

function App() {
  return (
    <ThemeProvider theme={{ [THEME_ID]: Theme }}>
      <BrowserRouter>
        <PageLayout />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
