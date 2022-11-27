import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GRID } from '../models/Grid';
import { GameContext } from '../store/GameContext';

const Game = () => {
  const {
    makeMove,
    playerName,
    opponentName,
    concede,
    isWinner,
    moves,
    isMyTurn,
    isInQueue,
    leaveGame,
  } = useContext(GameContext);

  const navigate = useNavigate();

  if (isInQueue) {
    return (
      <div className='flex flex-col justify-center items-center w-full h-screen border gap-2'>
        <div>Waiting for opponent...</div>
      </div>
    );
  }
  const vs = (
    <p className='font-semibold text-md'>
      {playerName} vs {opponentName}
    </p>
  );

  let winLose;
  if (isWinner === true) {
    winLose = (
      <h2 className='text-green-500 font-bold text-xl3 border border-blue-500 rounded-md px-4 py-2'>
        YOU Won!
      </h2>
    );
  } else if (isWinner === false) {
    winLose = (
      <h2 className='text-red-500 font-bold text-xl3 border border-blue-500 rounded-md px-4 py-2'>
        YOU Lose!
      </h2>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-screen border gap-2'>
      <h1>{isWinner !== undefined && winLose}</h1>
      <h3>{vs}</h3>
      {isWinner === undefined && (
        <h3>{isMyTurn ? 'Your turn.' : "Opponent's turn"}</h3>
      )}
      <div className='flex flex-wrap w-60 h-60'>
        {GRID.map((cell, index) => (
          <div
            key={cell}
            className='h-20 w-20 text-gray-200 hover:text-white text-xl3 font-bold bg-blue-500 hover:bg-blue-800 flex justify-center items-center'
            onClick={
              isMyTurn && isWinner === undefined
                ? () => makeMove(cell)
                : () => {}
            }
          >
            {moves[index]}
          </div>
        ))}
      </div>
      {isWinner === undefined ? (
        <button
          className='px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900'
          onClick={concede}
        >
          Concede
        </button>
      ) : (
        <button
          className='px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900'
          onClick={() => {
            leaveGame();
            navigate('/');
          }}
        >
          Leave
        </button>
      )}
    </div>
  );
};

export default Game;
