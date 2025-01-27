import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token'); // Retrieve token inside useEffect
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false); // Set loading to false
        return;
      }
      
      try {
        const response = await axios.get('http://localhost:5000/protected', {
          headers: {
            'Authorization': 'Bearer ' + token // Use token directly
          }
        });
        
        const data = await response.data;
        console.log(data.verified);
        setIsAuthenticated(data.verified);
        
      } catch (error) {
        console.error('Token validation error:', error); // Log the error
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    validateToken();
  }, []); // Removed token from dependency array

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator
  }

  if (!isAuthenticated) {
    
    return ( 
    <Router>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      {/* Add other routes as needed */}
    </Routes>
  </Router>
    )
  }

  const handleLogOut=()=>{
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <>
    <div>Hi, Welcome to the page</div> 
    <button onClick={handleLogOut}>log Out</button>
    </>
  );
}

export default App
