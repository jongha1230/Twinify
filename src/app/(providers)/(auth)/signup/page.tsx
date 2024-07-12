"use client";

import api from "@/api/api";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type SignupForm = {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
};

function SignupPage() {
  const [values, setValues] = useState<SignupForm>({
    email: "",
    password: "",
    checkPassword: "",
    nickname: "",
  });

  const { isLoding, error, user } = useAuthStore();

  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleChange = (prop: keyof SignupForm, value: string) => {
    setValues({ ...values, [prop]: value });
  };

  const validateForm = () => {
    if (!values.email || !values.password || !values.checkPassword || !values.nickname) {
      return true;
    }
    if (values.password !== values.checkPassword) {
      return true;
    }
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      return;
    }
    try {
      const { email, password, nickname } = values;
      await api.auth.signUp(email, password, nickname);
      console.log(`회원가입 성공!`);
      router.push("/");
    } catch (error) {
      console.error(`회원가입 도중 오류 발생${(error as Error).message}`);
    }
  };

  if (isLoding) return <div>회원가입 중...</div>;
  if (error) return <div> 에러: {error} </div>;

  return (
    <div className="flex flex-col items-center w-[43.75rem] h-[48.75rem] bg-white p-6 box-border">
      <div className="flex ml-auto mb-[60px] gap-1">
        <p className="text-black">계정이 있으신가요? </p>
        <Link href={"/login"} className="text-[#6BD700]">
          로그인하기
        </Link>
      </div>
      <form className="flex flex-col items-center gap-5" onSubmit={handleSignup}>
        <h1 className="text-black text-4xl font-black mb-[8px]">환영합니다!</h1>
        <div className="flex items-center rounded-lg border-solid border-2 border-[#D9D9D9] hover:border-black w-[25rem] h-[4.375rem] p-3 gap-1">
          <div className="relative w-7 h-7">
            <Image src={"/icons/account_circle.svg"} alt={`icon`} fill sizes="20" className="object-contain" />
          </div>
          <input type="text" className="border-none outline-none text-black" placeholder="닉네임" value={values.nickname} onChange={e => handleChange("nickname", e.target.value)}></input>
        </div>
        <div className="flex items-center rounded-lg border-solid border-2 border-[#D9D9D9] hover:border-black w-[25rem] h-[4.375rem] p-3 gap-1">
          <div className="relative w-7 h-7">
            <Image src={"/icons/mail.svg"} alt={`icon`} fill sizes="20" className="object-contain" />
          </div>
          <input type="text" className="border-none outline-none text-black" placeholder="이메일" value={values.email} onChange={e => handleChange("email", e.target.value)}></input>
        </div>
        <div className="flex items-center rounded-lg border-solid border-2 border-[#D9D9D9] hover:border-black w-[25rem] h-[4.375rem] p-3 gap-1">
          <div className="relative w-7 h-7">
            <Image src={"/icons/key.svg"} alt={`icon`} fill sizes="20" className="object-contain" />
          </div>
          <input type="password" className="border-none outline-none text-black" placeholder="비밀번호" value={values.password} onChange={e => handleChange("password", e.target.value)}></input>
        </div>
        <div className="flex items-center rounded-lg border-solid border-2 border-[#D9D9D9] hover:border-black w-[25rem] h-[4.375rem] p-3 gap-1">
          <div className="relative w-7 h-7">
            <Image src={"/icons/key.svg"} alt={`icon`} fill sizes="20" className="object-contain" />
          </div>
          <input
            type="password"
            className="border-none outline-none text-black"
            placeholder="비밀번호 확인"
            value={values.checkPassword}
            onChange={e => handleChange("checkPassword", e.target.value)}
          ></input>
        </div>
        <button className="rounded-lg text-black text-xl font-bold w-[25rem] h-[3.625rem] bg-[#6BD700] mt-[8px]">회원가입</button>
      </form>
      <p className="mt-[60px] text-black">By continuing you indicate that you read and agreed to the Terms of Use</p>
    </div>
  );
}

export default SignupPage;
