import { createContext, useState, useContext, ReactNode } from "react";

// Define types for user data (you can adjust this to fit your actual user model)
interface User {
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

  const signupUser = async (userData: {
    email: string;
    password: string;
    username: string;
  }) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
          credentials: "include",
        },
      );

      if (!res.ok) {
        // Log the response to see if there are any details in the response body
        const errorData = await res.json();
        console.error("Signup error:", errorData);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Signing up", data);
    } catch (error) {
      console.error("Signup error:", error);
    }
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
