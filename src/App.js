import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Game from './pages/Game';

function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Welcome />} />
        <Route path='/game' element={<Game />} />
      </Route>
    </Routes>
  );
}

export default App;
