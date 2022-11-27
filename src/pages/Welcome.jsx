import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from '../store/GameContext';

const Welcome = () => {
  const { askForRoom, playerName, setPlayerName, totalPlayers } =
    useContext(GameContext);

  useEffect(() => {
    setPlayerName(localStorage.getItem('playerName') || '');
  }, [setPlayerName]);

  const saveName = (name) => {
    if (name) {
      setPlayerName(name);
      localStorage.setItem('playerName', name);
    }
  };

  return (
    <div className='container flex flex-col justify-center items-center gap-y-4'>
      <div>Welcome to TicTacToe</div>
      <input
        className='px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600'
        type='text'
        name='userName'
        id='userName'
        placeholder='Enter name'
        value={playerName}
        onChange={(e) => saveName(e.target.value)}
      />
      <button className='hidden' type='submit'>
        Change name
      </button>
      <Link
        to='/game'
        className='px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900'
        onClick={() => (playerName ? askForRoom : null)}
      >
        Find random opponent
      </Link>
      <div>Stats</div>
      <p>People in lobby: {totalPlayers}</p>
      <p>Games in progress: 0</p>
    </div>
  );
};

export default Welcome;
