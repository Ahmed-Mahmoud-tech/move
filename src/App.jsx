import { Provider } from 'react-redux';
import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import AppWrapper from './components/Global/AppWrapper';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import Main from './components/Global/Main/Main';

const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </AppWrapper>
    </Provider>
  );
};

export default App;
