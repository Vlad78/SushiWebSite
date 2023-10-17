import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromLocalCookie } from "@/lib/auth";
import { User } from "@/types";

type ContextType = {
  user: User | null;
  loading: boolean;
  forceUpdate?: (e: User) => void;
};

const UserContext = createContext<ContextType>({
  user: null,
  loading: false,
});

let userState: User | null;

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
    forceUpdate: (e: User) => {
      userState = e;
      setUser((prev) => {
        return { ...prev, ...e };
      });
    },
    // forceUpdate: () => {
    //   console.log("🚀 ~ file: authContext.tsx:45 ~ useFetchUser ~ userState:", userState);
    //   userState = null;
    //   setBell((pr) => pr + 1);
    //   console.log("🚀 ~ file: authContext.tsx:53 ~ useFetchUser ~ bell:", bell);
    // },
  });

  useEffect(() => {
    if (userState) {
      return;
    }

    let isMounted = true;
    const resolveUser = async () => {
      const user = await getUserFromLocalCookie();

      if (isMounted) {
        setUser((prev) => {
          return { ...prev, user, loading: false };
        });
      }
    };
    resolveUser();

    return () => {
      isMounted = false;
    };
  }, [userState]);

  return data;
};
