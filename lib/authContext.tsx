import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromLocalCookie } from "@/lib/auth";
import { User } from "@/types";

type ContextType = {
  user: User | null;
  loading: boolean;
  forceUpdate: (e: User | null) => void;
};

const UserContext = createContext<ContextType>({
  user: null,
  loading: false,
  forceUpdate: () => {
    console.log("just check");
  },
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
    forceUpdate: (e: User | null) => {
      userState = e;
      setUser((prev) => {
        return { ...prev, user: e };
      });
    },
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
