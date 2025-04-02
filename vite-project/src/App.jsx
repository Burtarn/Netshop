import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import RootRouter from './RootRouter';
import './index.css';

const App = () => {
  return (
    <Provider store={store}>
      <RootRouter />
    </Provider>
  );
};

export default App;