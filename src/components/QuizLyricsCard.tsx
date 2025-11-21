import { useState } from "react";
import { useCardLyrics } from "../hooks/gameHooks";

export function QuizLyricsCard() {
  const { currentLine, trackingUrl, nextLine, loading, error } =
    useCardLyrics();
  const stored = sessionStorage.getItem("quizCard");
  const card = stored ? JSON.parse(stored) : null;

  const [refreshCount, setRefreshCount] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const maxRefresh = 3;

  const handleNextLine = () => {
    if (refreshCount >= maxRefresh) return;
    nextLine();
    setRefreshCount((prev) => prev + 1);
    setFeedback(null); // reset feedback ad ogni refresh
  };

  const handleClickArtist = (artist: string) => {
    if (!card) return;
    if (artist === card.correctArtist) {
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Wrong!");
    }
  };

  if (loading) return <p>Loading lyrics...</p>;
  if (error) return <p>{error}</p>;
  if (!currentLine || !card) return <p>No lyrics available.</p>;

  return (
    <div className="relative max-w-md mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col items-center gap-6">
      {/* Invisible tracking pixel for lyrics views tracking purpose  */}
      <img
        key={trackingUrl}
        src={trackingUrl}
        alt=""
        width="1"
        height="1"
        style={{ display: "none" }}
      />
      {feedback && (
        <div className="absolute top-3 right-3 px-2 py-1 text-sm font-bold rounded bg-gray-100">
          {feedback}
        </div>
      )}
      <h2 className="text-xl font-bold text-center">Lyric Line</h2>
      <p className="text-gray-800 text-center italic">{currentLine}</p>

      <button
        onClick={handleNextLine}
        disabled={refreshCount >= maxRefresh}
        className={`max-w-60 w-full mx-auto cursor-pointer px-4 py-2 rounded text-white ${
          refreshCount >= maxRefresh
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-primary-700 hover:bg-primary-600"
        }`}
      >
        {refreshCount >= maxRefresh ? "No more refresh" : "Refresh Lyric"}
      </button>

      <div className="flex justify-center gap-4 mt-2 flex-wrap">
        {card.artistOptions.map((artist: string) => (
          <button
            key={artist}
            onClick={() => handleClickArtist(artist)}
            className="px-4 py-2 cursor-pointer bg-gray-100 rounded hover:bg-gray-200"
          >
            {artist}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500 text-center mt-2">
        Refresh used: {refreshCount} / {maxRefresh}
      </p>
    </div>
  );
}
