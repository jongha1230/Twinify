

import api from "@/api/api";
import { Tables } from "@/types/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { create } from "zustand";



interface ExtendedUserProfile extends Tables<"users"> {
    user_metadata?: {
      nickname?: string;
      profileImg?: string;
    };
  }

interface AuthState {
    user: ExtendedUserProfile | null;
    isLoding: boolean;
    error: string | null;
    setUser: (user: ExtendedUserProfile | null) => void
    signIn: (email: string, password: string) => Promise<void> ;
    signUp: (email: string, password: string, nickname: string) => Promise<void> ;
    signOut: () => Promise<void> ;
    checkUser: () => Promise<void> ;
} 



export const useAuthStore = create<AuthState> ((set) => ({
    user: null,
    isLoding: false,
    error: null,

    setUser: (user) => set({ user }),
    signIn: async (email, password) => {
        set({isLoding: true, error: null});
        try {
            const user = await api.auth.signIn(email, password);
            set({user, isLoding: false})
        } catch (error) {
            set({error: (error as Error).message, isLoding: false})
        }
    },
    signUp: async (email, password, nickname) => {
        set({isLoding: true, error: null});
        try {
            const user = await api.auth.signUp(email, password, nickname);
            set({user, isLoding: false})
        } catch (error) {
            set({error: (error as Error).message, isLoding: false})
        }
    },
    signOut: async () => {
        set({isLoding: true, error: null});
        try {
            await api.auth.signOut();
            set({user: null, isLoding: false})
        } catch (error) {
            set({error: (error as Error).message, isLoding: false})
        }
    },
    checkUser: async () => {
        set({isLoding: true, error: null});
        try {
            const user = await api.auth.checkUser();
            set({user, isLoding: false})
        } catch (error) {
            set({user: null,error: (error as Error).message, isLoding: false})
        }
    },
}))