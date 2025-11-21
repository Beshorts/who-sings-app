import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/AuthRoute'; 
import { usePlayerContext } from './hooks/playerHooks';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const { currentPlayer } = usePlayerContext()
  const isLoggedIn = currentPlayer?.name ? true : false

  return (
   <BrowserRouter>
      <Routes>
        {/* public route */}
        <Route path="/" element={<LoginPage />} />
        {/* protected route */}
        <Route element={<ProtectedRoute isAuth={isLoggedIn} redirectPath="/" />}>
            <Route path="/game" element={<GamePage />} />
        </Route>
        {/* 3. NOT FOUND route */}
        <Route path="*" element={
            // if user is not logged redirect to login page
            // if url not exist show 404 not found
            !isLoggedIn 
              ? <ProtectedRoute isAuth={false} redirectPath="/" /> 
              : <NotFoundPage />
        } />
      </Routes>
    </BrowserRouter>
  );
}