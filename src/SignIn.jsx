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
      await axios.post(`${import.meta.env.VITE_SERVERAPI}/login`, {
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
      const response = await axios.post(`${import.meta.env.VITE_SERVERAPI}/login/verify`, {
        username: formData.name, // Send the user's name (this should be defined in formData)
        email: formData.email, // Send the user's email
        dateOfBirth: formData.dateOfBirth, // Send the user's date of birth (this should be defined in formData)
        otp: formData.otp // Send the OTP for verification
      });
      // Store the received token in local storage
      localStorage.setItem('token', JSON.stringify(response.data)); 
      window.location.reload(); // Reload the page to reflect changes
      // Redirect or update UI accordingly
    } catch (err) {
      // Handle errors during OTP verification
      setError(err.response?.data?.error || 'Invalid OTP'); // Set error message
    }
  };

  // Add the guest login function inside the SignIn component
  const handleGuestLogin = async () => {
    try {
      // Create a guest token with limited access
      const guestToken = {
        type: 'guest',
        access: 'limited',
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours expiry
      };
      
      // Store the guest token in localStorage
      localStorage.setItem('token', JSON.stringify(guestToken));
      
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      setError('Guest login failed. Please try again.');
    }
  };

  // Render the component
  return (
    <Container>
      <FormCard>
        <Logo>E M</Logo> {/* Logo for the application */}
        <Title>Sign in</Title> {/* Title of the sign-in form */}
        <Subtitle>Welcome back to EM</Subtitle> {/* Subtitle for the form */}
        
        {step === 1 ? ( // Conditional rendering based on the current step
          <Form onSubmit={handleSubmit} className="form-fade-in"> {/* Form for initial login */}
            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email} // Bind email input to formData
                onChange={handleChange} // Handle input changes
                placeholder="your.email@example.com" // Placeholder text
                required // Make this field required
                className="input-focus-effect"
              />
            </InputGroup>

            <Button type="submit" disabled={loading}> {/* Submit button for the form */}
              {loading ? 'Signing in...' : 'Sign in'} {/* Change button text based on loading state */}
            </Button>

            {error && <ErrorText>{error}</ErrorText>} {/* Display error message if exists */}
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

        <Divider>or</Divider> {/* Divider for alternative options */}
        
        <GoogleButton>
          Continue with Google {/* Button for Google sign-in */}
        </GoogleButton>

        <GuestButton onClick={handleGuestLogin}>
          Continue as Guest
        </GuestButton>
        
        <SignUpLink>
          Don't have an account? <Link to="/signup" className="link-hover-effect">Sign up</Link> {/* Link to sign-up page */}
        </SignUpLink>
      </FormCard>
      <ImageContainer /> {/* Container for the hero image */}
    </Container>
  );
};

// Styled components for the SignIn page
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #f8fafc;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormCard = styled.div`
  flex: 1;
  padding: 3rem;
  max-width: 500px;
  margin: auto;
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  @media (max-width: 768px) {
    max-width: 90%;
    padding: 2rem;
    margin: 2rem auto;
  }
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  letter-spacing: 2px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #fff;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  letter-spacing: 1px;
`;

const Subtitle = styled.p`
  color: #94a3b8;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #e2e8f0;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.875rem;
  background: rgba(15, 23, 42, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  color: #fff;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
    background: rgba(15, 23, 42, 0.5);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  padding: 0.875rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
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
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:disabled {
    background: rgba(99, 102, 241, 0.5);
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const Divider = styled.div`
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
  color: #94a3b8;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(30, 41, 59, 0.4);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(30, 41, 59, 0.6);
    transform: translateY(-2px);
  }
`;

const GuestButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(30, 41, 59, 0.4);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: rgba(30, 41, 59, 0.6);
    transform: translateY(-2px);
  }
`;

const SignUpLink = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: #94a3b8;
  
  a {
    color: #6366f1;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      color: #4f46e5;
      text-decoration: underline;
    }
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  background: url(${heroImage}) no-repeat center;
  background-size: cover;
  position: relative;
  
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
    );
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export default SignIn; // Export the SignIn component for use in other modules