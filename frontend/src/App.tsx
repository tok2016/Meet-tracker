import './App.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store';
import Router from './views/Router';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>
  )
}

export default App
