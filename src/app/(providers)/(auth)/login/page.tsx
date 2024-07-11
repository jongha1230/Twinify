"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

type LoginForm = {
  email: string;
  password: string;
};

function LoginPage() {
  const [values, setValues] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const { signIn, isLoding, error, user } = useAuthStore();

  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleChange = (prop: keyof LoginForm, value: string) => {
    setValues({ ...values, [prop]: value });
  };

  const validateForm = () => {
    if (!values.email || !values.password) {
      return true;
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      return;
    }
    try {
      const { email, password } = values;
      console.log(values);
      signIn(email, password);
      console.log(`로그인 시도 성공`);
      router.push("/");
    } catch (error) {
      console.error(`로그인 도중 오류 발생${(error as Error).message}`);
    }
  };

  if (isLoding) return <div>로그인 중...</div>;
  if (error) return <div> 에러: {error} </div>;

  return (
    <div className="flex flex-col items-center w-[43.75rem] h-[48.75rem] bg-white p-6 box-border">
      d
      <form className="flex flex-col items-center" onSubmit={handleLogin}>
        <h1 className="text-black text-4xl font-black  mt-[150px] mb-[70px]">로그인</h1>
        <div className="flex items-center rounded-lg border-solid border-2 border-[#D9D9D9] hover:border-black w-[25rem] h-[4.375rem] mb-[20px] p-3 gap-1">
          <div className="relative w-7 h-7">
            <Image src={"/icons/mail.svg"} alt={`icon`} fill sizes="20" className="object-contain" />
          </div>
          <input type="text" className="border-none outline-none text-black" placeholder="이메일" value={values.email} onChange={e => handleChange("email", e.target.value)}></input>
        </div>
        <div className="flex items-center rounded-lg border-solid border-2 border-[#D9D9D9] hover:border-black w-[25rem] h-[4.375rem] mb-[30px] p-3 gap-1">
          <div className="relative w-7 h-7">
            <Image src={"/icons/key.svg"} alt={`icon`} fill sizes="20" className="object-contain" />
          </div>
          <input type="password" className="border-none outline-none text-black" placeholder="비밀번호" value={values.password} onChange={e => handleChange("password", e.target.value)}></input>
        </div>
        <button className="rounded-lg text-black text-xl font-bold w-[25rem] h-[3.625rem] bg-[#6BD700] mb-[8px]">로그인</button>
        <Link href={"/signup"} className="flex justify-center items-center rounded-lg text-black text-xl font-bold w-[25rem] h-[3.625rem] bg-[#f1f1f1] mb-[8px]">
          회원가입
        </Link>
        <Link href={"/"} className="flex justify-center items-center rounded-lg  text-xl font-bold w-[25rem] h-[3.625rem] bg-[#000000] mb-[8px]">
          메인으로 이동
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
