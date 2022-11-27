import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { toastConfig } from '../toastConfig';

const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost';
const WS_PORT = process.env.REACT_APP_WS_PORT || '3001';
const socket = io(`${WS_URL}:${WS_PORT}`);

export const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [gameId, setGameId] = useState('global');
  const [playerID, setPlayerID] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [opponentName, setOpponentName] = useState('unknown');
  const [opponentID, setOpponentID] = useState('unknown');
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [isWinner, setIsWinner] = useState(undefined);
  const [moves, setMoves] = useState([''.repeat(8)]);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [isInQueue, setIsInQueue] = useState(false);

  const resetGame = () => {
    setGameId('global');
    setOpponentName('');
    setIsWinner(undefined);
    setMoves([''.repeat(8)]);
    setIsMyTurn(false);
  };

  const askForRoom = async () => {
    socket.emit('find', {});
  };

  const makeMove = (move) => {
    isMyTurn && socket.emit('move', { gameId, move });
  };

  const concede = () => {
    socket.emit('concede', { gameId });
    setIsWinner(false);
  };

  const leaveGame = () => {
    socket.emit('leaveGame', { gameId });
    resetGame();
  };

  useEffect(() => {
    socket.on('beginGame', ({ gameId }) => {
      resetGame();
      setGameId(gameId);
      setIsInQueue(false);
      socket.emit('name', { gameId, playerName, playerID });
    });

    socket.on('currentPlayer', ({ player }) => {
      setIsMyTurn(player === playerID);
    });

    socket.on('moves', ({ moves }) => {
      setMoves(moves);
    });

    socket.on('totalPlayers', ({ players }) => {
      setTotalPlayers(players);
    });

    socket.on('opponentName', ({ playerName }) => {
      setOpponentName(playerName);
    });

    socket.on('opponentID', ({ playerName }) => {
      setOpponentID(playerName);
    });

    socket.on('id', ({ id }) => {
      setPlayerID(id);
    });

    socket.on('winner', ({ player }) => {
      setIsWinner(player === playerID);
    });

    socket.on('inQueue', () => {
      setIsInQueue(true);
    });

    socket.on('error', ({ message }) => {
      toast.error(message, toastConfig);
    });

    return () => {
      socket.off('beginGame');
      socket.off('currentPlayer');
      socket.off('moves');
      socket.off('totalPlayers');
      socket.off('opponentName');
      socket.off('opponentID');
      socket.off('id');
      socket.off('winner');
      socket.off('inQueue');
      socket.off('error');
      // socket.off('error');
      // socket.off('error');
    };
  }, [playerID, gameId, playerName]);

  return (
    <GameContext.Provider
      value={{
        gameId,
        setPlayerName,
        askForRoom,
        makeMove,
        playerName,
        playerID,
        opponentName,
        opponentID,
        totalPlayers,
        concede,
        isWinner,
        moves,
        isMyTurn,
        isInQueue,
        leaveGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
