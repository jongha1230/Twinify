"use client";

import UserContext from "@/contexts/UserContext";
import { useAuthStore } from "@/stores/useAuthStore";
import { useContext, useEffect } from "react";

export default function ClientUserProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const context = useContext(UserContext);

  useEffect(() => {
    if (user?.id) {
      context.userId = user.id;
    }
  }, [user, context]);

  return <>{children}</>;
}
