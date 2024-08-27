import { useAuthStore } from "@/stores/useAuthStore";
import { Tables } from "@/types/supabase";

export class AuthAPI {
    private setUser: (user: Tables<"users"> | null) => void;

    constructor() {
        const { setUser } = useAuthStore.getState();
        this.setUser = setUser;
    }
    // 유저 정보 가공하기
    private async getFullUserInfo(user: Tables<"users">) {
        try {
            const userInfo = await this.getUserInfo();
            return { ...user, ...userInfo };
        } catch (error) {
            console.error('추가 사용자 정보 가져오기 실패', error);
            return user;
        }
    }

    // 회원가입
    async signUp(email: string, password: string, nickname: string): Promise<Tables<"users">> {
        try {
            const data= {email, password, nickname} 
            const response = await fetch("/api/auth/signup", {method: "POST", body: JSON.stringify(data)})

            const user = await response.json()
            const fullUser = await this.getFullUserInfo(user);
            this.setUser(fullUser);
    
            return user
        } catch (error) {
            throw new Error(`회원가입 도중 오류 발생${(error as Error).message}`);
        }
    }  
    // 로그인
    async signIn(email: string, password: string): Promise<{ status: string; user?: Tables<"users">; message?: string }> {
        try {
          const data = { email, password };
      
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include',
          });
      
          const result = await response.json();
      
          if (result.status === 'success' && result.user) {
            const fullUser = await this.getFullUserInfo(result.user);
            this.setUser(fullUser);
          }
      
          return result;
        } catch (error) {
          throw new Error(`로그인 도중 오류 발생: ${(error as Error).message}`);
        }
      }
    // 로그아웃
    async signOut() {
        try {
            const response = await fetch("/api/auth/logout", { method: "DELETE" });
            if(!response.ok) {throw new Error('로그아웃 실패')}
            this.setUser(null);
        } catch (error) {
            throw error;
        }
    }
    // 로그인 확인
    async checkUser() {
        try {
            const response = await fetch("/api/auth/check", {method: "GET"});
            console.log("Response status:", response.status);
             console.log("Response headers:", response.headers);
            if (response.status === 204) {
                this.setUser(null);
                return null;
            }
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || '유저 정보 확인 오류 발생');
            }
            const {user} = await response.json();
            const fullUser = await this.getFullUserInfo(user);
            this.setUser(fullUser);
            return user;
        } catch (error) {
            console.error("checkUser error:", error);
            this.setUser(null);
            return null;
        }
    }

    // 추가정보 받기
    async getUserInfo(): Promise<{ nickname: string; image_url: string }> {
        try {
          const response = await fetch("/api/auth/user-info", {
            method: "GET",
            credentials: 'include'
          });
          if (!response.ok) {
            throw new Error('사용자 정보 가져오기 실패');
          }
          return await response.json();
        } catch (error) {          
          throw error;
        }
      }
}

