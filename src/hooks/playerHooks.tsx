import { use } from 'react';
import { PlayerContext } from '../context/playerContext';


// encapsuled context to track if it is used within provider or not
export function usePlayer() {
  const context = use(PlayerContext);
  
  if (!context) {
    throw new Error('OOOPS usePlayer must be used within PlayerProvider');
  }
  
  return context;
}