import { useState } from 'react'; // Import useState hook from React for managing component state
import axios from 'axios'; // Import axios for making HTTP requests
import { Link } from 'react-router-dom'; // Import Link for navigation between routes
import styled from 'styled-components'; // Import styled-components for styling
import heroImage from './assets/heroimage.jpg'; // Import the hero image for background

// Styled components for the SignUp page

// Link to sign in page
const SignInLink = styled.p`
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

// Container for the entire sign-up page
const Container = styled.div`
  display: flex; // Use flexbox for layout
  min-height: 100vh; // Set minimum height to full viewport height
  gap: 200px; // Add gap between flex items;
  @media (max-width: 768px) {
    flex-direction: column; // Stack items vertically on smaller screens
  }
`;

// Card for the sign-up form
const FormCard = styled.div`
  flex: .5; // Take up half of the available space
  padding: 2rem; // Add padding inside the card
  max-width: 500px; // Set maximum width
  margin: auto; // Center the card
`;

// Container for the hero image
const ImageContainer = styled.div`
  flex: 1; // Take up the remaining space
  background: url(${heroImage}) no-repeat center; // Set background image
  background-size: cover; // Cover the entire area
  width: 700px; // Set width
  @media (max-width: 768px) {
    display: none; // Hide image on smaller screens
  }
`;

// Logo style
const Logo = styled.div`
  font-size: 1.5rem; // Set font size
  font-weight: bold; // Make text bold
  margin-bottom: 2rem; // Add margin below
`;

// Title style
const Title = styled.h1`
  font-size: 2rem; // Set font size for title
  margin-bottom: 0.5rem; // Add margin below
`;

// Subtitle style
const Subtitle = styled.p`
  color: #666; // Set subtitle color
  margin-bottom: 2rem; // Add margin below
`;

// Form style
const Form = styled.form`
  display: flex; // Use flexbox for layout
  flex-direction: column; // Stack items vertically
  gap: 1rem; // Add gap between form elements
`;

// Input group style
const InputGroup = styled.div`
  display: flex; // Use flexbox for layout
  flex-direction: column; // Stack items vertically
  gap: 0.5rem; // Add gap between label and input
`;

// Label style
const Label = styled.label`
  font-weight: 500; // Set font weight
`;

// Input field style
const Input = styled.input`
  padding: 0.75rem; // Add padding inside input
  border: 1px solid #ddd; // Set border color
  border-radius: 8px; // Round corners
  font-size: 1rem; // Set font size
`;

// Button style
const Button = styled.button`
  background: #4285f4; // Set button background color
  color: white; // Set button text color
  padding: 0.75rem; // Add padding inside button
  border: none; // Remove border
  border-radius: 8px; // Round corners
  font-size: 1rem; // Set font size
  cursor: pointer; // Change cursor to pointer on hover
  
  &:hover {
    background: #3574e2; // Change background color on hover
  }
`;

// Error message style
const ErrorText = styled.p`
  color: red; // Set error text color
  margin-top: 1rem; // Add margin at the top
`;

// Divider style
const Divider = styled.div`
  text-align: center; // Center the text
  margin: 1rem 0; // Add vertical margin
  color: #666; // Set text color
`;

// Google button style
const GoogleButton = styled.button`
  width: 100%; // Set width to 100%
  padding: 0.75rem; // Add padding inside button
  border: 1px solid #ddd; // Set border color
  border-radius: 8px; // Round corners
  background: white; // Set background color
  cursor: pointer; // Change cursor to pointer on hover
  
  &:hover {
    background: #f8f8f8; // Change background color on hover
  }
`;

// SignUp component definition
const SignUp = () => {
  // State to hold form data for user registration
  const [formData, setFormData] = useState({
    name: '', // User's name
    dateOfBirth: '', // User's date of birth
    email: '', // User's email address
    otp: '' // One-time password for verification
  });
  
  // State to manage the current step in the sign-up process
  const [step, setStep] = useState(1); // Initial step is 1
  const [error, setError] = useState(''); // State to hold error messages
  const [loading, setLoading] = useState(false); // State to manage loading state during submission

  // Function to handle input changes
  const handleChange = (e) => {
    // Update formData state with the new input value
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle the initial form submission
  const handleInitialSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true while submitting
    try {
      // Send a POST request to register the user
      await axios.post(`${import.meta.env.VITE_SERVERAPI}/register`, {
        username: formData.name, // Send the user's name
        email: formData.email, // Send the user's email
        dateOfBirth: formData.dateOfBirth // Send the user's date of birth
      });
      setStep(2); // Move to the next step after successful registration
      setError(''); // Clear any previous error messages
    } catch (err) {
      // Handle errors during registration
      setError(err.response?.data?.error || 'Something went wrong'); // Set error message
    }
  };

  // Function to handle OTP submission
  const handleOTPSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send a POST request to verify the OTP
      const response = await axios.post(`${import.meta.env.VITE_SERVERAPI}/registration/verify`, {
        username: formData.name, // Send the user's name
        email: formData.email, // Send the user's email
        dateOfBirth: formData.dateOfBirth, // Send the user's date of birth
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
        <Title>Sign up</Title> {/* Title of the sign-up form */}
        <Subtitle>Sign up to enjoy the feature of HD</Subtitle> {/* Subtitle for the form */}
        
        {step === 1 ? ( // Conditional rendering based on the current step
          <Form onSubmit={handleInitialSubmit}> {/* Form for initial registration */}
            <InputGroup>
              <Label>Your Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name} // Bind name input to formData
                onChange={handleChange} // Handle input changes
                placeholder="Jonas Khanwald" // Placeholder text
                required // Make this field required
              />
            </InputGroup>

            <InputGroup>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth} // Bind date of birth input to formData
                onChange={handleChange} // Handle input changes
                required // Make this field required
              />
            </InputGroup>

            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email} // Bind email input to formData
                onChange={handleChange} // Handle input changes
                placeholder="jonas_kahnwald@gmail.com" // Placeholder text
                required // Make this field required
              />
            </InputGroup>

            <Button type="submit" disabled={loading}> {/* Submit button for the form */}
              {loading ? 'Signing up...' : 'Sign up'} {/* Change button text based on loading state */}
            </Button>
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

        {error && <ErrorText>{error}</ErrorText>} {/* Display error message if exists */}
        
        <Divider>or</Divider> {/* Divider for alternative options */}
        <GoogleButton>
          Continue with Google {/* Button for Google sign-in */}
        </GoogleButton>
        <SignInLink>
          Already have an account? <Link to="/">SignIn</Link> {/* Link to sign-in page */}
        </SignInLink>
      </FormCard>
      <ImageContainer /> {/* Container for the hero image */}
    </Container>
  );
};

export default SignUp; // Export the SignUp component for use in other modules