import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../hooks/playerHooks";

export default function LoginForm() {

    const [name,setName] = useState('')

  const { login } = usePlayer();

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim()) {
      login(name);
      navigate('/game');
    }
  };

    return(
        <>
         <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="es. Betty"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent"
              autoFocus
            />
          </div>

          <button
            id="start"
            aria-labelledby="start"
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-primary-700 uppercase text-white py-3 rounded-lg font-semibold hover:bg-primary-300 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Start
          </button>
        </form>
        </>
    )
}