import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Welcome from './pages/Welcome';
import Game from './pages/Game';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/'>
          <Route index element={<Welcome />} />
          <Route path='/game' element={<Game />} />
        </Route>
      </Routes>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
