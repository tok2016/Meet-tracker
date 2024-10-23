import './App.css'
import { ThemeProvider, THEME_ID } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Theme from './utils/theme/Theme';
import PageLayout from './views/PageLayout';
import store from './store/store';

function App() {
  return (
    <ThemeProvider theme={{ [THEME_ID]: Theme }}>
      <BrowserRouter>
        <Provider store={store}>
          <PageLayout />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
