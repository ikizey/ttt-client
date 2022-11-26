import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from '../store/GameContext';

const Welcome = () => {
  const { askForRoom, playerName, setPlayerName, playerID, totalPlayers } =
    useContext(GameContext);

  const nameChangeHandle = (event) => {
    event.preventDefault();
    setPlayerName(event.currentTarget.userName.value);
  };

  return (
    <div className='container flex flex-col justify-center items-center gap-y-4'>
      <div>
        Welcome to TicTacToe {playerID} {playerName}
      </div>
      <form onSubmit={nameChangeHandle}>
        <input
          className='px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600'
          type='text'
          name='userName'
          id='userName'
          placeholder='Enter name'
        />
        <button className='hidden' type='submit'>
          Change name
        </button>
      </form>
      <Link
        to='/game'
        className='px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900'
        onClick={askForRoom}
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
