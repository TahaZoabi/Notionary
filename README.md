---

# A new adventure in full-stack development starts here! 🌟

# Notionary - Full Stack Notes Web App

Notionary is a simple and basic web app that allows users to create, read, update, and delete notes. It doesn't include advanced note management or organization features, making it a great starting point for anyone looking to build a simple notes app. The app includes user sign-up and login functionality with session-based authentication using **Express Session**.

## Features
- **User Authentication**: Sign up and log in to securely access your notes.
- **CRUD Operations**: Create, read, update, and delete notes.
- **Fully Responsive**: Designed to work seamlessly on mobile devices.
- **API Testing with Postman**: Postman is used for testing and ensuring API functionality.

## Tech Stack
### Frontend
- **React**: JavaScript library for building the user interface.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Vite**: Next-generation build tool that focuses on speed.

### Backend
- **Express.js**: Web framework for Node.js to handle API requests.
- **MongoDB**: NoSQL database to store user and note data.
- **Express Session**: Session-based authentication for user login.

## Installation

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (or use a cloud database like MongoDB Atlas)

### 1. Clone the repository:
```bash
git clone https://github.com/TahaZoabi/notionary.git
```

### 2. Set up the Backend (Express.js + MongoDB):
1. Navigate to the `server` directory:
   ```bash
   cd notionary/server
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add your MongoDB connection string:
   ```
   MONGO_URI=your_mongo_connection_string
   SESSION_SECRET=your_session_secret_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### 3. Set up the Frontend (React + TypeScript):
1. Navigate to the `client` directory:
   ```bash
   cd ../client
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm run dev
   ```

Now, the frontend should be running at [http://localhost:3000](http://localhost:3000), and the backend API will be running at [http://localhost:5000](http://localhost:5000).

## Usage

1. **Sign Up**: Create a new user account by providing a username, email, and password.
2. **Login**: Log in using your credentials to access your notes.
3. **Notes**: After logging in, you can create, update, or delete notes.

## Testing with Postman
The backend API can be tested using Postman to ensure the CRUD operations for notes work correctly. API routes are set up for user authentication and managing notes.

## Contributing

Feel free to fork the repository and submit a pull request if you'd like to contribute. Contributions are welcome!

---
