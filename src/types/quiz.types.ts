
export interface QuizCard {
  id: string;
  lyricLine: string;
  correctArtist: string;
  artistOptions: [string, string, string];
  trackName: string;
  trackingUrl: string; 
}

export type Country = 'IT' | 'US' | 'FR' | 'GB';

export interface QuizData {
  cards: [QuizCard, QuizCard, QuizCard];
  country: Country;
}