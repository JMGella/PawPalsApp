import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Dogs } from './pages/Dogs';
import { DogDetail } from './pages/DogDetail';
import { Walks } from './pages/Walks';
import { WalkDetail } from './pages/WalkDetail';
import { PawFriends } from './pages/PawFriends';
import './App.css';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} 
        />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dogs" 
          element={
            <ProtectedRoute>
              <Dogs />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dogs/:dogId" 
          element={
            <ProtectedRoute>
              <DogDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/walks" 
          element={
            <ProtectedRoute>
              <Walks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/walks/:walkId" 
          element={
            <ProtectedRoute>
              <WalkDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pawfriends" 
          element={
            <ProtectedRoute>
              <PawFriends />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

