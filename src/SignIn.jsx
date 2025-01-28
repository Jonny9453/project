import { useState } from 'react'; // Import useState hook from React for managing component state
import styled from 'styled-components'; // Import styled-components for styling
import { Link } from 'react-router-dom'; // Import Link for navigation between routes
import axios from 'axios'; // Import axios for making HTTP requests
import heroImage from './assets/heroimage.jpg'; // Import the hero image for background

// SignIn component definition
const SignIn = () => {
  // State to hold form data for user sign-in
  const [formData, setFormData] = useState({
    email: '', // User's email address
    otp: '' // One-time password for verification
  });
  
  // State to manage the current step in the sign-in process
  const [step, setStep] = useState(1); // Initial step is 1
  const [error, setError] = useState(''); // State to hold error messages
  const [loading, setLoading] = useState(false); // State to manage loading state during submission

  // Function to handle input changes
  const handleChange = (e) => {
    // Update formData state with the new input value
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear any previous error messages
  };

  // Function to handle the initial form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true while submitting

    try {
      // Send a POST request to log in the user
      await axios.post('https://signupbackendproject.onrender.com/login', {
        email: formData.email, // Send the user's email
      });
    
      setStep(2); // Move to the next step after successful login
      setError(''); // Clear any previous error messages
    } catch (err) {
      // Handle errors during login
      setError(err.response?.data?.error || 'Something went wrong'); // Set error message
    }
  };

  // Function to handle OTP submission
  const handleOTPSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send a POST request to verify the OTP
      const response = await axios.post('https://signupbackendproject.onrender.com/login/verify', {
        username: formData.name, // Send the user's name (this should be defined in formData)
        email: formData.email, // Send the user's email
        dateOfBirth: formData.dateOfBirth, // Send the user's date of birth (this should be defined in formData)
        otp: formData.otp // Send the OTP for verification
      });
      // Store the received token in local storage
      localStorage.setItem('token', response.data.token);
      window.location.reload(); // Reload the page to reflect changes
      // Redirect or update UI accordingly
    } catch (err) {
      // Handle errors during OTP verification
      setError(err.response?.data?.error || 'Invalid OTP'); // Set error message
    }
  };

  // Render the component
  return (
    <Container>
      <FormCard>
        <Logo>HD</Logo> {/* Logo for the application */}
        <Title>Sign in</Title> {/* Title of the sign-in form */}
        <Subtitle>Welcome back to HD</Subtitle> {/* Subtitle for the form */}
        
        {step === 1 ? ( // Conditional rendering based on the current step
          <Form onSubmit={handleSubmit}> {/* Form for initial login */}
            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email} // Bind email input to formData
                onChange={handleChange} // Handle input changes
                placeholder="your.email@example.com" // Placeholder text
                required // Make this field required
              />
            </InputGroup>

            <Button type="submit" disabled={loading}> {/* Submit button for the form */}
              {loading ? 'Signing in...' : 'Sign in'} {/* Change button text based on loading state */}
            </Button>

            {error && <ErrorText>{error}</ErrorText>} {/* Display error message if exists */}
          </Form>
        ) : ( // If step is not 1, render the OTP form
          <Form onSubmit={handleOTPSubmit}> {/* Form for OTP verification */}
            <InputGroup>
              <Label>OTP</Label>
              <Input
                type="text"
                name="otp"
                value={formData.otp} // Bind OTP input to formData
                onChange={handleChange} // Handle input changes
                placeholder="Enter OTP" // Placeholder text
                required // Make this field required
              />
            </InputGroup>
            <Button type="submit">Verify OTP</Button> {/* Submit button for OTP verification */}
          </Form>
        )}

        <Divider>or</Divider> {/* Divider for alternative options */}
        
        <GoogleButton>
          Continue with Google {/* Button for Google sign-in */}
        </GoogleButton>

        <SignUpLink>
          Don't have an account? <Link to="/signup">Sign up</Link> {/* Link to sign-up page */}
        </SignUpLink>
      </FormCard>
      <ImageContainer /> {/* Container for the hero image */}
    </Container>
  );
};

// Styled components for the SignIn page
const Container = styled.div`
  display: flex; // Use flexbox for layout
  min-height: 100vh; // Set minimum height to full viewport height
  gap: 200px; // Add gap between flex items
  @media (max-width: 768px) {
    flex-direction: column; // Stack items vertically on smaller screens
  }
`;

const FormCard = styled.div`
  flex: 0.5; // Take up half of the available space
  padding: 2rem; // Add padding inside the card
  max-width: 500px; // Set maximum width
  margin: auto; // Center the card
`;

const ImageContainer = styled.div`
  flex: 1; // Take up the remaining space
  background: url(${heroImage}) no-repeat center; // Set background image
  background-size: cover; // Cover the entire area
  width: 700px; // Set width
  @media (max-width: 768px) {
    display: none; // Hide image on smaller screens
  }
`;

const Logo = styled.div`
  font-size: 1.5rem; // Set font size for logo
  font-weight: bold; // Make text bold
  margin-bottom: 2rem; // Add margin below
`;

const Title = styled.h1`
  font-size: 2rem; // Set font size for title
  margin-bottom: 0.5rem; // Add margin below
`;

const Subtitle = styled.p`
  color: #666; // Set subtitle color
  margin-bottom: 2rem; // Add margin below
`;

const Form = styled.form`
  display: flex; // Use flexbox for layout
  flex-direction: column; // Stack items vertically
  gap: 1rem; // Add gap between form elements
`;

const InputGroup = styled.div`
  display: flex; // Use flexbox for layout
  flex-direction: column; // Stack items vertically
  gap: 0.5rem; // Add gap between label and input
`;

const Label = styled.label`
  font-weight: 500; // Set font weight for label
`;

const Input = styled.input`
  padding: 0.75rem; // Add padding inside input
  border: 1px solid #ddd; // Set border color
  border-radius: 8px; // Round corners
  font-size: 1rem; // Set font size
  
  &:focus {
    outline: none; // Remove outline on focus
    border-color: #4285f4; // Change border color on focus
  }
`;

const Button = styled.button`
  background: #4285f4; // Set button background color
  color: white; // Set button text color
  padding: 0.75rem; // Add padding inside button
  border: none; // Remove border
  border-radius: 8px; // Round corners
  font-size: 1rem; // Set font size
  cursor: pointer; // Change cursor to pointer on hover
  margin-top: 1rem; // Add margin at the top
  
  &:hover {
    background: #3574e2; // Change background color on hover
  }
  
  &:disabled {
    background: #ccc; // Change background color when disabled
    cursor: not-allowed; // Change cursor to not-allowed when disabled
  }
`;

const ErrorText = styled.p`
  color: #d93025; // Set error text color
  font-size: 0.9rem; // Set font size for error text
  margin-top: 0.5rem; // Add margin at the top
`;

const Divider = styled.div`
  text-align: center; // Center the text
  margin: 1.5rem 0; // Add vertical margin
  position: relative; // Set position to relative
  
  &::before,
  &::after {
    content: ''; // Create pseudo-elements for the divider lines
    position: absolute; // Position them absolutely
    top: 50%; // Center them vertically
    width: 45%; // Set width of the lines
    height: 1px; // Set height of the lines
    background-color: #ddd; // Set line color
  }
  
  &::before {
    left: 0; // Position the left line
  }
  
  &::after {
    right: 0; // Position the right line
  }
`;

const GoogleButton = styled.button`
  width: 100%; // Set width to 100%
  padding: 0.75rem; // Add padding inside button
  border: 1px solid #ddd; // Set border color
  border-radius: 8px; // Round corners
  background: white; // Set background color
  cursor: pointer; // Change cursor to pointer on hover
  display: flex; // Use flexbox for layout
  align-items: center; // Center items vertically
  justify-content: center; // Center items horizontally
  gap: 0.5rem; // Add gap between items
  
  &:hover {
    background: #f8f8f8; // Change background color on hover
  }
`;

const SignUpLink = styled.p`
  text-align: center; // Center the text
  margin-top: 2rem; // Add margin at the top
  color: #666; // Set text color
  
  a {
    color: #4285f4; // Set link color
    text-decoration: none; // Remove underline from link
    
    &:hover {
      text-decoration: underline; // Underline link on hover
    }
  }
`;

export default SignIn; // Export the SignIn component for use in other modules