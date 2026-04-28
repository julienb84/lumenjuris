import { createContext, useState, useContext } from "react";

import { UserData } from "../types/userData";

interface AuthContextValue {
  userRole: string | null;
  userVerified: boolean;
  userConnected: boolean;
  userData: UserData | null;
  login: (
    role: string,
    verified: boolean,
    status: boolean,
    data: UserData | null,
  ) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userVerified, setUserVerified] = useState(false);
  const [userConnected, setUserConnected] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const login = (
    role: string,
    verified: boolean,
    status: boolean,
    data: UserData | null,
  ) => {
    setUserRole(role);
    setUserVerified(verified);
    setUserConnected(status);
    setUserData(data);
  };

  const logout = () => {
    setUserConnected(false);
    setUserRole(null);
    setUserVerified(false);
  };

  return (
    <AuthContext.Provider
      value={{ userRole, userVerified, userConnected, userData, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthContextProvider");
  return ctx;
};
