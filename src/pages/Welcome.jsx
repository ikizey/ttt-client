import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className='container flex flex-col justify-center items-center gap-y-4'>
      <div>Welcome to TicTacToe</div>
      <form>
        <input
          className='px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600'
          type='text'
          name='userName'
          placeholder='Enter name'
          value='user342890432'
        />
        <button className='hidden' type='submit'>
          Change name
        </button>
      </form>
      <form>
        <input
          className='px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
          type='text'
          name='gameId'
          placeholder='Enter game id'
        />
        <button className='hidden' type='submit'>
          Enter Game
        </button>
      </form>

      <Link
        to='/game'
        className='px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900'
      >
        Play with Random player
      </Link>
      <div>Stats</div>
    </div>
  );
};

export default Welcome;
