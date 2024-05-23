import React from 'react';
import { AppContextProvider } from './contexts';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';

const App = () => {
  return (
    <AppContextProvider>
      <BrowserRouter basename="/way/dashboard">
        <Router />
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default App;

