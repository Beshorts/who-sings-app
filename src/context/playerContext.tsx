import { createContext, useReducer, type ReactNode } from 'react';
import type { PlayerContextType } from '../types/player.types';
import { playerReducer, initialPlayerState } from '../reducer/playerReducer';

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

function PlayerProvider({ children }: { children: ReactNode }) {

  const [state, dispatch] = useReducer(playerReducer, initialPlayerState, (initial) => {

    const currentPlayer = sessionStorage.getItem('currentPlayer');

    if (currentPlayer) {
      try {
        return { currentPlayer: JSON.parse(currentPlayer) };
      } catch {
        return initial;
      }
    }
    return initial;
  });

  const login = (name: string) => {

    const player = {
      name: name.trim(),
      createdAt: Date.now(),
    };

    sessionStorage.setItem('currentPlayer', JSON.stringify(player));
    dispatch({ type: 'LOGIN', payload: name });
  };

  const logout = () => {
    
    sessionStorage.removeItem('currentPlayer');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <PlayerContext value={{ ...state, login, logout }}>
      {children}
    </PlayerContext>
  );
}

export { PlayerContext, PlayerProvider };