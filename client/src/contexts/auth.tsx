import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface User {
  username: string;
}

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUsername = localStorage.getItem("username");
    return storedUsername ? { username: storedUsername } : null;
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUser({ username: storedUsername });
    }
  }, []);

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
        const errorData = await res.json();

        throw new Error(`${errorData.message}`);
      }

      const data = await res.json();

      setUser({
        username: data.username,
      });

      // save to local storage
      localStorage.setItem("username", data.username);
    } catch (error) {
      throw error;
    }
  };

  const loginUser = async (userData: {
    username: string;
    password: string;
  }) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/users/login`,
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
        const errorData = await res.json();

        throw new Error(`${errorData.message}`);
      }

      const data = await res.json();
      setUser({
        username: data.username,
      });

      // save to local storage
      localStorage.setItem("username", data.username);
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = async () => {
    setUser(null);
    localStorage.removeItem("username");
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
