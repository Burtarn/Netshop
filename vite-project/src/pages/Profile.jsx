import React from 'react';
import { useAuth } from '../context/AuthContext'; 
import '../styles/Profile.css'

const Profile = () => {
  const { setIsAuthenticated } = useAuth();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); 
  };

  return (
    <div>
      <h1>Profil</h1>
      <p>Välkommen till din profil!</p>
      <button onClick={handleLogout}>Logga ut</button>
    </div>
  );
};

export default Profile;