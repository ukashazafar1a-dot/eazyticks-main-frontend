"use client";

import useCookie from "@/hooks/useCookie";
import { cookieName } from "@/lib/utils";
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// 1. State shape
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role: "USER" | "ADMIN";
}

// 2. Action types
type AuthAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_AUTH"; payload: boolean };

// 3. Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

// 4. Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_AUTH":
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
};

// 5. Context value type
interface AuthContextType extends AuthState {
  checkAuth: () => Promise<void>;
}

// 6. Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 7. Provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { clearAllCookies } = useCookie();

  // Helper functions

  const temporaryLogout = () => {
    clearAllCookies();
    if (typeof window !== "undefined") {
      localStorage.removeItem(cookieName);
      window.location.reload();
    }
  };

  const checkAuth = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      if (typeof window === "undefined") return;

      const storedUser = localStorage.getItem(cookieName);
      if (storedUser) {
        temporaryLogout();
        return;
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 8. Custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
