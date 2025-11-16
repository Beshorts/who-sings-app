import { useNavigate } from "react-router";
import { GameHeader } from "../components/GameHeader";
import { usePlayer } from "../hooks/playerHooks";

export default function GamePage() {
  const { currentPlayer, } = usePlayer();
  const navigate = useNavigate();

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
        </div>
      </main>
    </div>
  );
}
