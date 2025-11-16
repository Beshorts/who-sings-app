import { useNavigate } from "react-router-dom";
import { usePlayer } from "../hooks/playerHooks";


export function GameHeader() {
  // use Store
  const { currentPlayer, logout } = usePlayer();


  const getCurrentPlayerName = currentPlayer?.name.toUpperCase();

  // hook to allow user to navigate without interact directly
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex flex-wrap justify-between items-center p-6">
      <h1 className="text-3xl font-black mx-auto text-primary-700 pb-6 md:mx-0 md:p-0">
        🎵 Who Sings?
      </h1>
      <div className="flex justify-between items-center w-full md:w-auto mt-4 md:mt-0">
        <span className="text-md font-bold text-gray-700 md:mr-16">
          Hi {getCurrentPlayerName} 🖖
        </span>
        <button
          id="logout"
          aria-labelledby="logout"
          onClick={handleLogout}
          className="text-[12px] cursor-pointer rounded-full text-gray-600 hover:text-primary-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-log-out-icon lucide-log-out"
          >
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          </svg>
        </button>
      </div>
    </header>
  );
}
