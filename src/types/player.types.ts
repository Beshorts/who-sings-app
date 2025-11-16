// entity
export interface Player {
    name: string;
    createdAt: number
}

// reducer state
export interface PlayerState {
  currentPlayer: Player | null;
}

//reducer actions (type + payload)
export type PlayerAction =
  | { type: 'LOGIN'; payload: string }
  | { type: 'LOGOUT' };

// context state + actions
export interface PlayerContextType extends PlayerState {
  login: (name: string) => void;
  logout: () => void;
}