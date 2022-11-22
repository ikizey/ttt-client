import React from 'react';

const GRID = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const Game = () => {
  return (
    <div className='grid grid-cols-3 gap-1'>
      {GRID.map((cell) => (
        <div
          key={cell}
          className='h-20 w-20 bg-blue-500 hover:bg-blue-800'
        ></div>
      ))}
    </div>
  );
};

export default Game;
