import * as jwt from "jsonwebtoken";
import { useCallback, useEffect, useState } from "react";
import { api } from "./http";

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export function useUser() {
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage["alphaiota:jwt"]) {
      const token = localStorage["alphaiota:jwt"];
      const user = jwt.decode(token) as { profile: IUser };
      setUser(user?.profile as IUser);
    }
  }, []);

  const refetch = useCallback(async () => {
    const { jwt: token }: { jwt: string } = await api
      .url("/auth/jwt")
      .get()
      .json();
    localStorage["alphaiota:jwt"] = token;
    const user = jwt.decode(token) as { profile: IUser };
    setUser(user?.profile as IUser);
  }, []);

  return { user, refetch };
}
