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
  const [userData, setUserData]=useState({})
  
  const [formData, setFormData] = useState({
    note: ''
  });
  useEffect(() => {
    const fetchProtectedData = async () => { // Define an async function
      const email = JSON.parse(localStorage.getItem('token')).user.email; 
      
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVERAPI}/protected/user?email=${encodeURIComponent(email)}`); // Corrected encodeURIComponent
        console.log('Protected data:', response.data); // Log the response data
        setUserData(response.data.data)
      
      } catch (error) {
        console.error('Error fetching protected data:', error); // Log any errors
      }
    };

   
      fetchProtectedData();
      
  }, []); // Empty dependency array means this runs once on mount

  // Effect to validate the token on component mount
  useEffect(() => {
    const validateToken = async () => {
      const token = JSON.parse(localStorage.getItem('token')); // Retrieve and parse the token object
      
      if (!token) {
        setIsAuthenticated(false); // If no token, set authenticated state to false
        setLoading(false); // Set loading to false
        return; // Exit the function
      }
      
      try {
        // Send a GET request to validate the token
        const response = await axios.get(`${import.meta.env.VITE_SERVERAPI}/protected`, {
          headers: {
            'Authorization': 'Bearer ' + token.token // Include token in the Authorization header
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

  // Render loading indicator whil://signupbackendproject.onrender.come validating token
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

  const addFunction=async(e)=>{
   e.preventDefault()
      const email = JSON.parse(localStorage.getItem('token')).user.email; 
      
      try {
         await axios.post(`${import.meta.env.VITE_SERVERAPI}/protected/addNotes?email=${encodeURIComponent(email)}`,formData); // Corrected encodeURIComponent
        window.location.reload()
        
      } catch (error) {
        console.error('Error sending data:', error); // Log any errors
      }
    };

    const handleChange = (e) => {
      // Update formData state with the new input value
      setFormData({ ...formData, [e.target.name]: e.target.value });
   
    };
  const deletefunction=async(index)=>{
      
      const email = JSON.parse(localStorage.getItem('token')).user.email; 
      
      try {
         await axios.post(`${import.meta.env.VITE_SERVERAPI}/protected/deleteNotes`,{
          email: email,
          index: index 
         }); // Corrected encodeURIComponent
        
        window.location.reload()
      } catch (error) {
        console.error('Error sending data:', error); // Log any errors
      }
  }
  // Render the main application content for authenticated users
  return (
    <>
      <div>Hi, Welcome to the page</div> {/* Welcome message */}
      <div>
        <h1>Username: {userData.username}</h1>
        <p><span style={{fontWeight:'bold'}}>Date Of Birth</span>: {userData.dateOfBirth}</p>
        <p><span style={{fontWeight:'bold'}}>Email</span>: {userData.email}</p>
        <form action="" onSubmit={addFunction}>
        <input 
          type="text" 
          name="note"
          value={formData.note}
          onChange={handleChange}
        />
        <button type='submit'>
          Add
        </button>
        </form>
        <h2>Notes</h2>
        <div>
          {userData.notes&&userData.notes.map((note, index) => (
            <div key={index}style={{display:"flex", justifyContent:"space-between"}}>
              <ol>
                <li>{note}</li>
              </ol>
            
            <button style={{backgroundColor:"red", color:"white"}} onClick={(e)=>{e.preventDefault(); deletefunction(index)}}>delete</button>
            </div>
          ))}
        </div>

      </div>
      <button onClick={handleLogOut}>Log Out</button> {/* Button to log out */}
    </>
  );
}

export default App; // Export the App component for use in other modules