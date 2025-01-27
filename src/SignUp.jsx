import  { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import heroImage from './assets/heroimage.jpg';


// Styled components
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
`;

const Button = styled.button`
  background: #4285f4;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background: #3574e2;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 1rem;
`;

const Divider = styled.div`
  text-align: center;
  margin: 1rem 0;
  color: #666;
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  
  &:hover {
    background: #f8f8f8;
  }
`;

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    otp: ''
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', {
        username: formData.name,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth
      });
      setStep(2);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/registration/verify', {
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
        <Title>Sign up</Title>
        <Subtitle>Sign up to enjoy the feature of HD</Subtitle>
        
        {step === 1 ? (
          <Form onSubmit={handleInitialSubmit}>
            <InputGroup>
              <Label>Your Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jonas Khanwald"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jonas_kahnwald@gmail.com"
                required
              />
            </InputGroup>

            <Button type="submit">Sign up</Button>
          </Form>
        ) : (
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

        {error && <ErrorText>{error}</ErrorText>}
        
        <Divider>or</Divider>
        <GoogleButton>
          Continue with Google
        </GoogleButton>
      </FormCard>
      <ImageContainer />
    </Container>
  );
};



export default SignUp; 