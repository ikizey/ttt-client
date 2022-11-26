import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import GameContextProvider from './store/GameContext';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GameContextProvider>
  </React.StrictMode>
);
