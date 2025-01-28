import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components from react-router-dom
import SignUp from './SignUp'; // Import SignUp component
import SignIn from './SignIn'; // Import SignIn component
import { useEffect, useState } from 'react'; // Import hooks from React
import axios from 'axios'; // Import axios for making HTTP requests

import './App.css'; // Import CSS styles for the application

// Main App component
function App() {
  // State to manage authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading status
  
  // Effect to validate the token on component mount
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      
      if (!token) {
        setIsAuthenticated(false); // If no token, set authenticated state to false
        setLoading(false); // Set loading to false
        return; // Exit the function
      }
      
      try {
        // Send a GET request to validate the token
        const response = await axios.get('https://signupbackendproject.onrender.com/protected', {
          headers: {
            'Authorization': 'Bearer ' + token // Include token in the Authorization header
          }
        });
        
        const data = await response.data; // Get the response data
        console.log(data.verified); // Log the verification status
        setIsAuthenticated(data.verified); // Update authentication state based on verification
        
      } catch (error) {
        console.error('Token validation error:', error); // Log any errors during token validation
        setIsAuthenticated(false); // Set authenticated state to false on error
      } finally {
        setLoading(false); // Set loading to false after validation attempt
      }
    };

    validateToken(); // Call the token validation function
  }, []); // Empty dependency array means this runs once on mount

  // Render loading indicator while validating token
  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  // If not authenticated, show sign-in and sign-up routes
  if (!isAuthenticated) {
    return ( 
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} /> {/* Route for SignUp component */}
          <Route path="/" element={<SignIn />} /> {/* Route for SignIn component */}
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    );
  }

  // Function to handle user logout
  const handleLogOut = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    window.location.reload(); // Reload the page to reflect changes
  }

  // Render the main application content for authenticated users
  return (
    <>
      <div>Hi, Welcome to the page</div> {/* Welcome message */}
      <button onClick={handleLogOut}>Log Out</button> {/* Button to log out */}
    </>
  );
}

export default App; // Export the App component for use in other modules