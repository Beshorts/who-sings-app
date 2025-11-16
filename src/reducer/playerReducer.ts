import type { PlayerState, PlayerAction } from '../types/player.types';

export const initialPlayerState: PlayerState = {
  currentPlayer: null,
};

export function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'LOGIN':
      return {
        currentPlayer: {
          name: action.payload.trim(),
          createdAt: Date.now(),
        },
      };
    case 'LOGOUT':
      return {
        currentPlayer: null,
      };
    default:
      return state;
  }
}