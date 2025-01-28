# HD Sign-Up and Sign-In Application

## Overview
This project is a web application that allows users to sign up and sign in using their email and a one-time password (OTP). The application is built using React for the frontend and communicates with a backend API for user authentication and verification.

## Features
- User registration with email and date of birth.
- OTP verification for secure sign-in.
- Google sign-in option (to be implemented).
- Responsive design for mobile and desktop views.

## Technologies Used
- **Frontend:** React, React Router, Axios, Styled Components
- **Backend:** Node.js, Express, MongoDB (for user data storage)
- **Authentication:** JSON Web Tokens (JWT)

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB database (local or cloud) for storing user data.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Jonny9453/project.git
   cd your-repo-name
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```plaintext
   MONGODB_CONNECTION_LINK=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Usage
- **Sign Up:** Users can create an account by providing their name, date of birth, and email address. After submitting the form, they will receive an OTP for verification.
- **Sign In:** Users can log in using their email and the OTP sent to them. Upon successful verification, they will be redirected to the main page.
- **Log Out:** Users can log out, which will remove their authentication token from local storage.

## API Endpoints
- `POST /register`: Register a new user.
- `POST /login`: Log in a user and send an OTP.
- `POST /login/verify`: Verify the OTP and log in the user.
- `GET /protected`: Protected route to validate the user's token.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Thanks to the contributors and the open-source community for their support and resources.
