import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromLocalCookie } from "@/lib/auth";
import { User } from "@/types";

type ContextType = {
  user: User | null;
  loading: boolean;
};

const UserContext = createContext<ContextType>({
  user: null,
  loading: false,
});

let userState: User;

export const UserProvider = ({
  value,
  children,
}: {
  value: ContextType;
  children: React.ReactNode;
}) => {
  const { user } = value;

  useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export const useFetchUser = () => {
  const [data, setUser] = useState<ContextType>({
    user: userState || null,
    loading: userState === undefined,
  });

  useEffect(() => {
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;
    const resolveUser = async () => {
      const user = await getUserFromLocalCookie();

      if (isMounted) {
        setUser({ user, loading: false });
      }
    };
    resolveUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return data;
};
