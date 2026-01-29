import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { saveToken, getToken, deleteToken } from "./tokenStore";
import { login as loginApi } from "../api/auth";

type AuthContextValue = {
  isLoading: boolean;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const t = await getToken();
      setToken(t);
      setIsLoading(false);
    })();
  }, []);

  const signIn = async (email: string, password: string) => {
    const data = await loginApi(email, password);
    await saveToken(data.token);
    setToken(data.token);
  };

  const signOut = async () => {
    await deleteToken();
    setToken(null);
  };

  const value = useMemo(() => ({ isLoading, token, signIn, signOut }), [isLoading, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
