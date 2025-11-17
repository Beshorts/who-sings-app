import { useNavigate } from "react-router";
import { GameHeader } from "../components/GameHeader";
import { usePlayer } from "../hooks/playerHooks";
import { musixmatchAPI } from "../services/API";

export default function GamePage() {
  const { currentPlayer, } = usePlayer();
  const navigate = useNavigate();

  // testing for deploy
   const testAPI = async () => {
    console.log('🚀 Testing API...');
    try {
      const data = await musixmatchAPI.getChartTracks('IT');
      console.log('✅ Tracks ricevute:', data.message.body.track_list.length);
      console.log('Prima track:', data.message.body.track_list[0].track);
      console.log('Full response:', data);
    } catch (error) {
      console.log("Errore chart tracks:", error);
    }

     try {
    // Aggiungi await qui per ottenere il risultato reale
    const lyricsData = await musixmatchAPI.getTrackLyrics(undefined, 87318877);
    console.log("Lyrics ricevuti:", lyricsData);
  } catch (error) {
    console.log("Errore lyrics:", error);
  }
  };


  // if any player is logged back to Login Page
  if (!currentPlayer) {
    navigate("/");
    return null;
  }

  return (
    <div className="container font-sans min-h-screen mx-auto mt-2 md:mt-8 ">
      <GameHeader />
      <main>
        <div className="bg-rose-50 rounded-2xl shadow-lg p-8 text-center m-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Game description coming soon!
          </h2>
          <p className="text-gray-600">🎮</p>
          <button className="cursor-pointer" onClick={testAPI}>call me</button>
        </div>
      </main>
    </div>
  );
}
