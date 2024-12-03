import './App.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import PageLayout from './views/PageLayout';
import store from './store/store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PageLayout />
      </Provider>
    </BrowserRouter>
  )
}

export default App
