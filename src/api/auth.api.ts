
import { createClient } from "@/supabase/client";
import { Tables } from "@/types/supabase";
import { create } from "domain";

class AuthAPI {
// 회원가입
async signUp(email: string, password: string, nickname: string): Promise<Tables<"users">> {
    try {
        const data= {email, password, nickname} 
    const response = await fetch("http://localhost:3000/api/auth/signup", {method: "POST", body: JSON.stringify(data)})
    const user = await response.json()
    console.log("user1:", user)
    return user
    } catch (error) {
        throw new Error(`회원가입 도중 오류 발생${(error as Error).message}`);
    }
}  
// 로그인
async signIn(email: string, password: string): Promise<Tables<"users">> {
    try {
        const supabase = createClient()
        const data= {email, password} 
        console.log("왈", data)
        const response = await fetch("http://localhost:3000/api/auth/login", { method: "POST", headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(data), credentials: 'include', });
    console.log(response, "멍", data)
    const {user, session} = await response.json()
    console.log("user1:", user)
    if (session ) {
        await supabase.auth.setSession(session)
    }
    return user
    } catch (error) {
        throw new Error(`로그인 도중 오류 발생${(error as Error).message}`);
    }
} 
// 로그아웃
async signOut() {
    try {
        const response = await fetch("http://localhost:3000/api/auth/logout", { method: "DELETE" });
        if(!response.ok) {throw new Error('로그아웃 실패')}
    } catch (error) {
        console.error('로그아웃 오류 발생', error)
    }
}
// 로그인 확인

async checkUser() {
    try {
        const response = await fetch("http://localhost:3000/api/auth/check", {method: "GET"});
        if(!response.ok) {throw new Error('유저 정보 확인 오류 발생')}
       const {user} = await response.json()
       return user
    } catch (error) {
        console.error('유저 정보 확인 중 오류 발생', error)
    }
}

}

export default AuthAPI