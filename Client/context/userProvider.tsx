import { createContext, useState, ReactNode } from "react";

// Define types for function arguments
interface AuthContextType {
  userLoggedIn: (email: string, password: string) => Promise<void>;
  userSignup: (username: string, email: string, password: string) => Promise<boolean>;
  fetchUserDetails: () => Promise<any>;
  getAllQuestions: () => Promise<any>;
  questions: Record<string, any>;
}

// Create context with default empty values
const userContext = createContext<AuthContextType | undefined>(undefined);

// Optional: define the props for the provider component
interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [userDetails, setUserDetails] = useState<Record<string, any>>({});
  const [questions, setquestions] = useState<Record<string, any>>({});


  const userLoggedIn = async (email: string, password: string): Promise<void> => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("Auth-Token", data.authToken);
      return data.success;
    } else {
      return data.success;
    }
  };

  const userSignup = async (username: string, email: string, password: string): Promise<boolean> => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return data.success;
    } else {
      return data.success;
    }
  };
  // fetch the login user details
  const fetchUserDetails = async () => {
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("Auth-Token") || "",
      },
    });

    if (response.ok) {
      const data = await response.json();
     return data;
    }
  };

  // get all questions
  const getAllQuestions = async () => {
    const response = await fetch("http://localhost:5000/api/user/get-all-questions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setquestions(data.questions);
      return data;
    }
  };
  return (
    <userContext.Provider value={{ userLoggedIn, userSignup, fetchUserDetails, getAllQuestions,questions }}>
      {children}
    </userContext.Provider>
  );
};

export { userContext, UserProvider };
