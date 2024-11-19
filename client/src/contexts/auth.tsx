import { createContext, useState, useContext, ReactNode } from "react";

// Define types for user data (you can adjust this to fit your actual user model)
interface User {
  id: string;
  email: string;
  username: string;
}

// Define types for the context data
interface AuthContextType {
  user: User | null;
  signupUser: (userData: {
    email: string;
    password: string;
    username: string;
  }) => Promise<void>;
  loginUser: (userData: {
    username: string;
    password: string;
  }) => Promise<void>;
  logoutUser: () => Promise<void>;
}

// Create context with a default value of undefined for now
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider component, which takes children as props
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signupUser = async (userData: { email: string; password: string }) => {
    console.log("Signing up", userData);
  };

  const loginUser = async (userData: {
    username: string;
    password: string;
  }) => {
    console.log("Logging in", userData);
  };

  const logoutUser = async () => {
    setUser(null);
    console.log("Logging out");
  };

  const contextData: AuthContextType = {
    user,
    signupUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
