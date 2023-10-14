"use client";

import { UserProvider, useFetchUser } from "@/lib/authContext";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const context = useFetchUser();
  return <UserProvider value={context}>{children}</UserProvider>;
};

export default Auth;
