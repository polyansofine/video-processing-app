import { createContext, useState, useContext, useEffect, useRef } from "react";

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

export function useInterval(callback, delay, stopFlag) {
  const savedCallback = useRef();
  //Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id;
    function tick() {
      savedCallback.current();
      if (stopFlag) {
        clearInterval(id);
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  });
}
