import  { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import heroImage from './assets/heroimage.jpg';

const SignIn = () => {
 
  const [formData, setFormData] = useState({
    email: '',
    otp:''
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://signupbackendproject.onrender.com/login', {
        
        email: formData.email,
        
      });
    
      setLoading(true)
      setStep(2);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://signupbackendproject.onrender.com/login/verify', {
        username: formData.name,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        otp: formData.otp
      });
      localStorage.setItem('token', response.data.token);
      window.location.reload()
      // Redirect or update UI accordingly
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP');
    }
  };
  return (
    <Container>
      <FormCard>
        <Logo>HD</Logo>
        <Title>Sign in</Title>
        <Subtitle>Welcome back to HD</Subtitle>
        {step === 1 ? (
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </InputGroup>

          

         

          <Button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>

          {error && <ErrorText>{error}</ErrorText>}
        </Form>): (
          <Form onSubmit={handleOTPSubmit}>
            <InputGroup>
              <Label>OTP</Label>
              <Input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                required
              />
            </InputGroup>
            <Button type="submit">Verify OTP</Button>
          </Form>
        )}

        <Divider>or</Divider>
        
        <GoogleButton>
          Continue with Google
        </GoogleButton>

        <SignUpLink>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </SignUpLink>
      </FormCard>
      <ImageContainer />
    </Container>
  );
};

// Styled components (matching your signup page style)
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  gap:200px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormCard = styled.div`
  flex: .5;
  padding: 2rem;
  max-width: 500px;
  margin: auto;
`;

const ImageContainer = styled.div`
  flex: 1;
  background: url(${heroImage}) no-repeat center;
  background-size: cover;
  width: 700px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4285f4;
  }
`;



const Button = styled.button`
  background: #4285f4;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background: #3574e2;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: #d93025;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const Divider = styled.div`
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: #ddd;
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
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: #f8f8f8;
  }
`;

const SignUpLink = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: #666;
  
  a {
    color: #4285f4;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default SignIn; 