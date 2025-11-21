import { useMemo, useState } from "react";
import type { QuizCard } from "../types/quiz.types";
import type { Track } from "../types/API.types";
import { useTrackLyrics } from "./APIhooks";

/**** QUIZ CARD HOOK */

interface GenerateCard {
  card: QuizCard | null;
  loading: boolean;
  error: string | null;
  generateCard: () => Promise<QuizCard | null>;
}

export const useGenerateQuizCards = (): GenerateCard => {

  const [card, setCard] = useState<QuizCard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCard = async (): Promise<QuizCard | null> => {
    setLoading(true);
    setError(null);

    try {
      const stored = sessionStorage.getItem("chartTracks");
      if (!stored) throw new Error("<sessionStorage is empty>");

      const allTracks: Track[] = JSON.parse(stored);
      
      if (allTracks.length < 3)
        throw new Error("Not enough tracks to create quiz card!");

      // shuffle and keep 3 tracks
      const shuffled = [...allTracks].sort(() => Math.random() - 0.5);
      const [correctTrack, wrong1, wrong2] = shuffled.slice(0, 3);

      const artistOptions = [
        correctTrack.artist_name,
        wrong1.artist_name,
        wrong2.artist_name,
      ].sort(() => Math.random() - 0.5);

      const newCard: QuizCard = {
        id: `card-${correctTrack.track_id}-${Date.now()}`,
        correctArtist: correctTrack.artist_name,
        artistOptions,
        trackIscrArtist: correctTrack.track_isrc,
        commontrackIdArtist: correctTrack.commontrack_id,
      };

      // save the single card data in storage
      sessionStorage.setItem("quizCard", JSON.stringify(newCard));

      setCard(newCard);
      return newCard;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { card, loading, error, generateCard };
};

export const useCardLyrics = () => {
  
  const stored = sessionStorage.getItem("quizCard");
  const card: QuizCard | null = stored ? JSON.parse(stored) : null;

  const { lyrics, loading, error } = useTrackLyrics({
    trackIsrc: card?.trackIscrArtist,
    commontrackId: card?.commontrackIdArtist || 0,
  });

  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // current line to display
  const currentLine = useMemo(() => {
    if (!lyrics || !lyrics.body) return "";
    // break the lines
    const lines = lyrics.body.split("\n").filter(Boolean);
    if (lines.length === 0) return "";
    // return the current line
    return lines[currentLineIndex % lines.length];
  }, [lyrics, currentLineIndex]);

  // for lyrics views tracking purpose 
  const trackingUrl = useMemo(() => {
    return lyrics?.pixelTrackingUrl || "";
  }, [lyrics]);

  // go to the next line
  const nextLine = () => {
    if (!lyrics || !lyrics.body) return;
    const lines = lyrics.body.split("\n").filter(Boolean);
    setCurrentLineIndex((prev) => (prev + 1) % lines.length);
  };

  return { currentLine,trackingUrl, nextLine, loading, error };
};
