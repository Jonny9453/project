import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components from react-router-dom
import SignUp from './SignUp'; // Import SignUp component
import SignIn from './SignIn'; // Import SignIn component
import { useEffect, useState } from 'react'; // Import hooks from React
import axios from 'axios'; // Import axios for making HTTP requests

import './App.css'; // Import CSS styles for the application

// Update the styles object with futuristic design elements
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Poppins', sans-serif",
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    minHeight: '100vh',
    color: '#e2e8f0',
    '@media (max-width: 768px)': {
      padding: '10px'
    }
  },
  header: {
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    padding: '40px',
    borderRadius: '30px',
    marginBottom: '40px',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)',
      transform: 'rotate(30deg)'
    }
  },
  headerTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#ffffff',
    textShadow: '0 0 20px rgba(255,255,255,0.3)',
    letterSpacing: '1px'
  },
  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '50px',
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
      gap: '20px'
    }
  },
  eventCard: {
    background: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#f8fafc',
    borderRadius: '24px',
    padding: '30px',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 12px 40px rgba(31, 38, 135, 0.5)',
      '&::after': {
        transform: 'translateX(100%)'
      }
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      transition: 'transform 0.5s',
      zIndex: 1
    },
    '& h3': {
      color: '#ffffff',
      fontSize: '1.5rem',
      fontWeight: '600',
      textShadow: '0 0 10px rgba(255,255,255,0.2)'
    },
    '& p': {
      color: '#e2e8f0',
      fontSize: '1.1rem',
      lineHeight: '1.6'
    }
  },
  userInfo: {
    background: 'rgba(30, 41, 59, 0.8)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    padding: '35px',
    borderRadius: '24px',
    marginBottom: '40px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#f8fafc',
    '& h2, & h3': {
      color: '#ffffff',
      textShadow: '0 0 10px rgba(255,255,255,0.2)'
    },
    '& p': {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#e2e8f0'
    },
    '& strong': {
      color: '#ffffff',
      fontWeight: '600'
    }
  },
  form: {
    background: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '30px',
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  },
  input: {
    background: 'rgba(15, 23, 42, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    padding: '16px 20px',
    borderRadius: '16px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    '&:focus': {
      background: 'rgba(15, 23, 42, 0.5)',
      borderColor: '#6366f1',
      boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.1)',
    },
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)'
    }
  },
  button: {
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    color: 'white',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '16px',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
      '&::after': {
        transform: 'translateX(100%)'
      }
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transition: 'transform 0.5s',
      zIndex: 1
    }
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '14px',
    fontWeight: '500',
    '&:hover': {
      backgroundColor: '#dc2626',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)'
    }
  },
  notesList: {
    display: 'grid',
    gap: '25px',
    '@media (max-width: 600px)': {
      gap: '20px'
    }
  },
  noteCard: {
    background: 'rgba(30, 41, 59, 0.8)',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#f8fafc',
    '& h3': {
      color: '#ffffff',
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '10px',
      textShadow: '0 0 10px rgba(255,255,255,0.2)'
    },
    '& p': {
      color: '#e2e8f0',
      fontSize: '1.1rem',
      lineHeight: '1.6'
    },
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)'
    }
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#ffffff',
    position: 'relative',
    paddingBottom: '15px',
    marginBottom: '30px',
    textShadow: '0 0 15px rgba(255,255,255,0.3)',
    letterSpacing: '0.5px'
  },
  eventDate: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: '14px',
    marginTop: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  eventDescription: {
    margin: '15px 0',
    lineHeight: '1.7',
    color: 'rgba(255,255,255,0.9)',
    fontSize: '15px'
  }
};

// Main App component
function App() {
  // State to manage authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [userData, setUserData]=useState({})
  const [events, setEventsData]= useState({})
  const [formData, setFormData] = useState({
    title: '',
    description:'',
    date:'',
  });

  useEffect(()=>{
    const fetchEvents=async()=>{
      try{
        const response = await axios.get(`${import.meta.env.VITE_SERVERAPI}/events?`); 
        console.log(' data:', response.data); // Log the response data
        setEventsData(response.data.data)
      } catch (error) {
        console.error('Error fetching  data:', error); // Log any errors
      }
    }
    fetchEvents()
  },[])
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

  // Render loading indicator while validating token
  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }
  const token = JSON.parse(localStorage.getItem('token'));
  // If not authenticated, show sign-in and sign-up routes
  if (!isAuthenticated || token?.type=="guest") {
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
         await axios.post(`${import.meta.env.VITE_SERVERAPI}/protected/addEvent?email=${encodeURIComponent(email)}`,formData); // Corrected encodeURIComponent
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
         await axios.post(`${import.meta.env.VITE_SERVERAPI}/protected/deleteEvent`,{
          email: email,
          index: index 
         }); // Corrected encodeURIComponent
        
        window.location.reload()
      } catch (error) {
        console.error('Error sending data:', error); // Log any errors
      }
  }

  const isGuest = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    return token?.type === 'guest';
  };

  // Render the main application content for authenticated users
  return (
    <div style={styles.container} className="cyber-lines">
      <header style={styles.header} className="glass-morphism">
        <h1 style={styles.headerTitle} className="glow-text">Event Dashboard</h1>
      </header>

      <section className="section">
        <h2 style={styles.sectionTitle}>Ongoing Events</h2>
        <div style={styles.eventsGrid}>
          {events && events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} style={styles.eventCard}>
                <h3>{event.title}</h3>
                <div className="text-contrast">
                  <p>{event.description}</p>
                </div>
                <p style={styles.eventDate}>
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <button className="join-button cyber-button">Join Event</button>
              </div>
            ))
          ) : (
            <div style={styles.eventCard}>
              <h3>No Events Found</h3>
              <div className="text-contrast">
                <p>There are no ongoing events at this time.</p>
              </div>
            </div>
          )}
        </div>
      </section>
{!isGuest() &&(
  <>
      <section style={styles.userInfo}>
        <h2>User Profile</h2>
        <h3>{userData.username}</h3>
        <p><strong>Date of Birth:</strong> {userData.dateOfBirth}</p>
        <p><strong>Email:</strong> {userData.email}</p>
      </section>

      <section>
        <h2>Add New Event</h2>
        <form onSubmit={addFunction} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <button type="submit" className="simple-button">Add Event</button>
        </form>
      </section>

      <section>
        <h2>My Events</h2>
        <div style={styles.notesList}>
          {userData.notes && userData.notes.map((note, index) => (
            <div key={index} style={styles.noteCard}>
              <div>
                <h3>{note.title}</h3>
                <div className="text-contrast">
                  <p>{note.description}</p>
                </div>
                <p>{new Date(note.date).toLocaleDateString()}</p>
              </div>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.preventDefault();
                  deletefunction(index);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
</>)}
      <button 
        onClick={handleLogOut} 
        className="logout-button"
        style={{marginTop: '30px'}}
      >
           {isGuest() ? 'Exit Guest Mode' : 'Log Out'}
      </button>
    </div>
  );
}

export default App; // Export the App component for use in other modules