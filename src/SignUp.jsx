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
  color: #94a3b8; // Set text color

  a {
    color: #6366f1; // Set link color
    text-decoration: none; // Remove underline from link
    font-weight: 500; // Set font weight
    transition: all 0.3s ease; // Add transition for hover effect

    &:hover {
      color: #4f46e5; // Change link color on hover
      text-decoration: underline; // Underline link on hover
    }
  }
`;

// Container for the entire sign-up page
const Container = styled.div`
  display: flex; // Use flexbox for layout
  min-height: 100vh; // Set minimum height to full viewport height
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); // Set background gradient
  color: #f8fafc; // Set text color
  @media (max-width: 768px) {
    flex-direction: column; // Stack items vertically on smaller screens
  }
`;

// Card for the sign-up form
const FormCard = styled.div`
  flex: 1; // Take up half of the available space
  padding: 3rem; // Add padding inside the card
  max-width: 500px; // Set maximum width
  margin: auto; // Center the card
  background: rgba(30, 41, 59, 0.7); // Set background color with transparency
  backdrop-filter: blur(10px); // Apply blur effect to background
  border: 1px solid rgba(255, 255, 255, 0.1); // Set border color with transparency
  border-radius: 24px; // Round corners
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37); // Add shadow for depth
  @media (max-width: 768px) {
    max-width: 90%; // Reduce width on smaller screens
    padding: 2rem; // Reduce padding on smaller screens
    margin: 2rem auto; // Center the card on smaller screens
  }
`;

// Container for the hero image
const ImageContainer = styled.div`
  flex: 1; // Take up the remaining space
  background: url(${heroImage}) no-repeat center; // Set background image
  background-size: cover; // Cover the entire area
  position: relative; // Use relative positioning for pseudo-element
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      rgba(15, 23, 42, 0.9),
      rgba(15, 23, 42, 0.3)
    ); // Add gradient overlay
  }

  @media (max-width: 768px) {
    display: none; // Hide image on smaller screens
  }
`;

// Logo style
const Logo = styled.div`
  font-size: 2rem; // Set font size
  font-weight: bold; // Make text bold
  margin-bottom: 2rem; // Add margin below
  color: #fff; // Set text color
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3); // Add text shadow for a glow effect
  letter-spacing: 2px; // Add letter spacing for a futuristic look
`;

// Title style
const Title = styled.h1`
  font-size: 2.5rem; // Set font size for title
  margin-bottom: 0.5rem; // Add margin below
  color: #fff; // Set text color
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.3); // Add text shadow for a glow effect
  letter-spacing: 1px; // Add letter spacing for a futuristic look
`;

// Subtitle style
const Subtitle = styled.p`
  color: #94a3b8; // Set subtitle color
  margin-bottom: 2rem; // Add margin below
  font-size: 1.1rem; // Set font size
`;

// Form style
const Form = styled.form`
  display: flex; // Use flexbox for layout
  flex-direction: column; // Stack items vertically
  gap: 1.5rem; // Add gap between form elements
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
  color: #e2e8f0; // Set text color
  font-size: 0.95rem; // Set font size
`;

// Input field style
const Input = styled.input`
  padding: 0.875rem; // Add padding inside input
  background: rgba(15, 23, 42, 0.3); // Set background color with transparency
  border: 1px solid rgba(255, 255, 255, 0.1); // Set border color with transparency
  border-radius: 12px; // Round corners
  font-size: 1rem; // Set font size
  color: #fff; // Set text color
  transition: all 0.3s ease; // Add transition for hover effect
  
  &:focus {
    outline: none; // Remove outline on focus
    border-color: #6366f1; // Change border color on focus
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); // Add shadow on focus
    background: rgba(15, 23, 42, 0.5); // Change background color on focus
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5); // Set placeholder text color
  }
`;

// Button style
const Button = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); // Set button background gradient
  color: white; // Set button text color
  padding: 0.875rem; // Add padding inside button
  border: none; // Remove border
  border-radius: 12px; // Round corners
  font-size: 1rem; // Set font size
  cursor: pointer; // Change cursor to pointer on hover
  transition: all 0.3s ease; // Add transition for hover effect
  position: relative; // Use relative positioning for pseudo-element
  overflow: hidden; // Allow overflow for pseudo-element
  
  &:hover {
    transform: translateY(-2px); // Move button up on hover
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3); // Add shadow on hover
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    ); // Add gradient overlay for a glow effect
    transition: 0.5s; // Add transition for the glow effect
  }

  &:hover::before {
    left: 100%;
  }

  &:disabled {
    background: rgba(99, 102, 241, 0.5); // Change background color when disabled
    cursor: not-allowed; // Change cursor to not-allowed when disabled
  }
`;

// Error message style
const ErrorText = styled.p`
  color: #ef4444; // Set error text color
  font-size: 0.9rem; // Set font size
  margin-top: 0.5rem; // Add margin at the top
`;

// Divider style
const Divider = styled.div`
  text-align: center; // Center the text
  margin: 1.5rem 0; // Add vertical margin
  position: relative; // Use relative positioning for pseudo-elements
  color: #94a3b8; // Set text color
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background: rgba(255, 255, 255, 0.1); // Set divider color with transparency
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
`;

// Google button style
const GoogleButton = styled.button`
  width: 100%; // Set width to 100%
  padding: 0.875rem; // Add padding inside button
  border: 1px solid rgba(255, 255, 255, 0.1); // Set border color with transparency
  border-radius: 12px; // Round corners
  background: rgba(30, 41, 59, 0.4); // Set background color with transparency
  color: #fff; // Set text color
  cursor: pointer; // Change cursor to pointer on hover
  display: flex; // Use flexbox for layout
  align-items: center; // Center items vertically
  justify-content: center; // Center items horizontally
  gap: 0.5rem; // Add gap between icon and text
  transition: all 0.3s ease; // Add transition for hover effect
  
  &:hover {
    background: rgba(30, 41, 59, 0.6); // Change background color on hover
    transform: translateY(-2px); // Move button up on hover
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
        <Logo>E M</Logo> {/* Logo for the application */}
        <Title>Sign up</Title> {/* Title of the sign-up form */}
        <Subtitle>Sign up to enjoy the feature of EM</Subtitle> {/* Subtitle for the form */}
        
        {step === 1 ? ( // Conditional rendering based on the current step
          <Form onSubmit={handleInitialSubmit} className="form-fade-in"> {/* Form for initial registration */}
            <InputGroup>
              <Label>Your Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name} // Bind name input to formData
                onChange={handleChange} // Handle input changes
                placeholder="Jonas Khanwald" // Placeholder text
                required // Make this field required
                className="input-focus-effect"
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
                className="input-focus-effect"
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
                className="input-focus-effect"
              />
            </InputGroup>

            <Button type="submit" disabled={loading}> {/* Submit button for the form */}
              {loading ? 'Signing up...' : 'Sign up'} {/* Change button text based on loading state */}
            </Button>
          </Form>
        ) : ( // If step is not 1, render the OTP form
          <Form onSubmit={handleOTPSubmit} className="form-fade-in"> {/* Form for OTP verification */}
            <InputGroup>
              <Label>OTP</Label>
              <Input
                type="text"
                name="otp"
                value={formData.otp} // Bind OTP input to formData
                onChange={handleChange} // Handle input changes
                placeholder="Enter OTP" // Placeholder text
                required // Make this field required
                className="input-focus-effect"
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
          Already have an account? <Link to="/" className="link-hover-effect">SignIn</Link> {/* Link to sign-in page */}
        </SignInLink>
      </FormCard>
      <ImageContainer /> {/* Container for the hero image */}
    </Container>
  );
};

export default SignUp; // Export the SignUp component for use in other modules