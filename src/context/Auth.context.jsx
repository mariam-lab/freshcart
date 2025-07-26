import { createContext, useState } from "react";
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );

  function logOut() {
    setToken(null);
    setIsLoading(false);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  }
  return (
    <AuthContext.Provider value={{ token, setToken, logOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
