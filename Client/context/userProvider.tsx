import { createContext, useState, ReactNode } from "react";

interface QuestionData {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar?: string;
    reputation: number;
  };
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  createdAt: string;
  hasAcceptedAnswer: boolean;
  latestAnswer?: string;
  answerList?: {
    content: string;
    upvotes: number;
    downvotes: number;
    createdAt: string;
    user: {
      name: string;
      avatar?: string;
    };
  }[];
}

interface AuthContextType {
  userLoggedIn: (email: string, password: string) => Promise<void>;
  userSignup: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  fetchUserDetails: () => Promise<any>;
  getStaticalCounts: () => Promise<any>;
  getAllQuestions: () => Promise<QuestionData[]>;
  questions: QuestionData[];
}

const userContext = createContext<AuthContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [userDetails, setUserDetails] = useState<Record<string, any>>({});
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  const userLoggedIn = async (
    email: string,
    password: string
  ): Promise<void> => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("login data:", data);

    if (data.success) {
      localStorage.setItem("Auth-Token", data.authToken);
    }
    return data;
  };

  const userSignup = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    return data.success;
  };

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

  const getAllQuestions = async () => {
    const [questionRes, answerRes] = await Promise.all([
      fetch("http://localhost:5000/api/admin/get-all-questions"),
      fetch("http://localhost:5000/api/admin/get-all-answers"),
    ]);

    const questionsData = await questionRes.json();
    const answersData = await answerRes.json();

    const answersByQuestion = answersData.answers.reduce(
      (acc: any, ans: any) => {
        const qId = ans.questionId.toString();
        if (!acc[qId]) acc[qId] = [];
        acc[qId].push(ans);
        return acc;
      },
      {}
    );

    const processed = questionsData.questions.map((q: any) => {
      const relatedAnswers = answersByQuestion[q._id.toString()] || [];
      const latestAnswer = [...relatedAnswers].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];

      return {
        id: q._id,
        title: q.title,
        description: q.description,
        author: {
          name: q.userId?.username || "Unknown",
          avatar: q.userId?.profilePhoto || undefined,
          reputation: 0,
        },
        tags: q.tags || [],
        votes: 0,
        answers: relatedAnswers.length,
        views: 0,
        createdAt: q.createdAt,
        hasAcceptedAnswer: !!q.acceptedAnswerId,
        latestAnswer: latestAnswer?.content,
        answerList: relatedAnswers.map((ans: any) => ({
          content: ans.content,
          upvotes: ans.upwardVote || 0,
          downvotes: ans.downwardVote || 0,
          createdAt: ans.createdAt,
          user: {
            name: ans.userId?.username || "Anonymous",
            avatar: ans.userId?.profilePhoto || undefined,
          },
        })),
      };
    });

    setQuestions(processed);
    return processed;
  };

  const getStaticalCounts = async () => {
    const response = await fetch("http://localhost:5000/api/user/get-count", {
      method: "GET",
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
  return (
    <userContext.Provider
      value={{
        userLoggedIn,
        userSignup,
        fetchUserDetails,
        getAllQuestions,
        getStaticalCounts,
        questions,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export { userContext, UserProvider };
