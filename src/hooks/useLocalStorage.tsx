"use client";
import { useState } from "react";
/**
 * A React hook for managing state synchronized with localStorage.
 * This hook abstracts the process of reading from and writing to localStorage,
 * allowing components to use localStorage like regular React state.
 *
 * @param {string} key - The key under which the value is stored in localStorage.
 *                      This is a unique identifier for the data in localStorage.
 * @param {Cookie} defaultValue - The default value to use if there is no item in
 *                                localStorage with the specified key. This value is
 *                                also used as the initial state.
 *
 * @returns {Array} A tuple where the first element is the current state value
 *                  (synchronized with localStorage), and the second element is
 *                  a setter function that updates both the state and the localStorage
 *                  value.
 *
 */

type Cookie = string;
type UseLocalStorageReturnType = [Cookie, (value: Cookie) => void];

const useLocalStorage = (
  key: string,
  defaultValue: Cookie
): UseLocalStorageReturnType => {
  // Create state variable to store
  // localStorage value in state
  const [localStorageValue, setLocalStorageValue] = useState<Cookie>(() => {
    try {
      if (typeof window !== "undefined") {
        const value = window?.localStorage?.getItem(key);
        // If value is already present in
        // localStorage then return it

        // Else set default value in
        // localStorage and then return it
        if (value) {
          return JSON.parse(value);
        } else {
          window.localStorage?.setItem(key, JSON.stringify(defaultValue));
          return defaultValue;
        }
      }
    } catch (error) {
      if (typeof window !== "undefined") {
        window.localStorage?.setItem(key, JSON.stringify(defaultValue));
      }
      return defaultValue;
    }
  });

  // this method update our localStorage and our state
  const setLocalStorageStateValue: (value: Cookie) => void = (
    value: Cookie
  ) => {
    if (typeof window !== "undefined") {
      window.localStorage?.setItem(key, JSON.stringify(value));
      setLocalStorageValue(value);
    }
  };
  return [localStorageValue, setLocalStorageStateValue];
};

export default useLocalStorage;
