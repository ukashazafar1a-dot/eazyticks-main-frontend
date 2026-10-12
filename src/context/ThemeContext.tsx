"use client";
import { getUserLocation } from "@/helpers/UserLocation";
import { categories_schema } from "@/lib/categories";
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// 1. State shape
interface ThemeState {
  searchDrawer: boolean;
  location: any;
  categories: any;
  isLocPermissionGranted?: boolean;
  ticketDownloading?: boolean;
}

// 6. Initial state
const initialState: ThemeState = {
  searchDrawer: false,
  location: null,
  categories: categories_schema,
  isLocPermissionGranted: false,
  ticketDownloading: false,
};

// 2. Action types
type ThemeAction =
  | { type: "TOGGLE_SEARCH_DRAWER"; payload: boolean }
  | { type: "SET_LOCATION"; payload: any }
  | { type: "SET_CATEGORIES"; payload: any }
  | { type: "SET_LOC_PERMISSION"; payload: any }
  | { type: "SET_TICKET_DOWNLOADING"; payload: any }

// 3. Reducer
const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case "TOGGLE_SEARCH_DRAWER":
      return { ...state, searchDrawer: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_LOC_PERMISSION":
      return { ...state, isLocPermissionGranted: action.payload };
    case "SET_TICKET_DOWNLOADING":
      return { ...state, ticketDownloading: action.payload };
    default:
      return state;
  }
};

// 4. Context value type
interface ThemeContextType extends ThemeState {
  toggleSearchDrawer: (value: boolean) => void;
  setPreciseLocation: () => Promise<any>;
  setCategories: (categories: any) => void;
  setLocation: (location: any) => void;
  setLocPermission: (isGranted: boolean) => void;
  setTicketDownloading: (isDownloading: boolean) => void;
}

// 5. Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 7. Provider
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Helper functions
  const toggleSearchDrawer = (value: boolean) =>
    dispatch({ type: "TOGGLE_SEARCH_DRAWER", payload: value });

  const setPreciseLocation = (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await getUserLocation(); // <- your wrapper around geolocation
        if (!data) {
          resolve(null);
          dispatch({
            type: "SET_LOC_PERMISSION",
            payload: false,
          });
          return;
        }

        dispatch({
          type: "SET_LOCATION",
          payload: data,
        });

        localStorage.setItem("locObject", JSON.stringify(data));
        dispatch({
          type: "SET_LOC_PERMISSION",
          payload: true,
        });
        resolve(data);
      } catch (error) {
        console.error("Error getting location:", error);
        resolve(null); // or reject(error) if you prefer hard rejection
        dispatch({
          type: "SET_LOC_PERMISSION",
          payload: false,
        });
      }
    });
  };

  const setCategories = (categories: any) => {
    dispatch({
      type: "SET_CATEGORIES",
      payload: categories,
    });
  };

  const setLocation = (location: any) => {
    dispatch({
      type: "SET_LOCATION",
      payload: location,
    });
  };

  const setLocPermission = (isGranted: boolean) => {
    dispatch({
      type: "SET_LOC_PERMISSION",
      payload: isGranted,
    });
  };

  const setTicketDownloading = (isDownloading: boolean) => {
    dispatch({
      type: "SET_TICKET_DOWNLOADING",
      payload: isDownloading,
    });
  }

  useEffect(() => {
    try {
      if (typeof window === "undefined") return; // ✅ Prevents SSR errors
      let oldLocation = window?.localStorage.getItem("locObject");
      if (oldLocation) {
        dispatch({
          type: "SET_LOCATION",
          payload: JSON.parse(oldLocation),
        });
      }
    } catch (err) {
      console.log(
        "Here are the initial errors on page load in checking user",
        err
      );
    }
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        ...state,
        toggleSearchDrawer,
        setPreciseLocation,
        setCategories,
        setLocation,
        setLocPermission,
        setTicketDownloading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// 8. Custom hook
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
