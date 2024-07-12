"use client";

import { createContext } from "react";

type UserContextType = {
  userId: string | null;
};

const UserContext = createContext<UserContextType>({ userId: null });

export default UserContext;
