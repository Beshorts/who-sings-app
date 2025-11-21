
/** static question card data */
export interface QuizCard {
  id: string;
  correctArtist: string; // the artist who belongs the track
  trackIscrArtist?: string;
  commontrackIdArtist: number;
  artistOptions: string[]; // 2 other artists

}

/** single card result */
export interface CardResult {
  cardId: string;
  isCorrect: boolean;
  creditsEarned: number;
  responseTime: number; // The exact time (in milliseconds) it tooks the user to give the right answer
}

/** full round result */
export interface QuizRound {
  id: string;
  cards: QuizCard[]; // 3 cards per round
  timePerRound: number;
}
 /** full round result  */
export interface RoundResult {
  roundId: string | null;
  cardResults: CardResult[];
  totalScore: number; // crdits won in this single round
}

export interface QuizSession {
  //id: string;
  playerName: string;
  //roundsResults: RoundResult[]; // array with the results of each round played by the same user in the same quiz session
  //bestRoundScore: number; // get the highest round score among all rounds played in the session
  //status: 'in-progress' | 'completed';
  rounds: RoundResult[];
  totalScore: number;
}