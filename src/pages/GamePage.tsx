import { useState } from "react";
import { useNavigate } from "react-router";
import { GameHeader } from "../components/GameHeader";
import { usePlayerContext } from "../hooks/playerHooks";
import { GameBanner } from "../components/GameBanner";
import { useChartTracks } from "../hooks/APIhooks";
import type { QuizCard, } from "../types/quiz.types";
import { QuizLyricsCard } from "../components/QuizLyricsCard";



export default function GamePage() {
  const { currentPlayer } = usePlayerContext();

  const navigate = useNavigate();

  // get all tracks API call
  useChartTracks();
  
  const [fade, setFade] = useState(true);

  const showQuizCard = sessionStorage.getItem("quizCard")
  // back to home page if no user logged in
  if (!currentPlayer) {
    navigate("/");
    return null;
  }

  // handle click QuizLyricCard button 
  const handleStartQuiz = async (generateCard: () => Promise<QuizCard | null>) => {
    await generateCard();
    setFade(false);
    setTimeout(() => setFade(true), 350);
  };

  return (
    <div className="container font-sans min-h-screen mx-auto mt-2 md:mt-8">
      <GameHeader />
      <main>
        <div className={`transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
          {showQuizCard ? (
            <QuizLyricsCard />
          ) : (
            <GameBanner onStart={handleStartQuiz} />
          )}
        </div>
      </main>
    </div>
  );
}
