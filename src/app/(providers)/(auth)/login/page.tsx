import Link from "next/link";
import Image from "next/image";

function LoginPage() {
  return (
    <div className="flex flex-col items-center w-[43.75rem] h-[48.75rem] bg-white p-6 box-border">
      <form className="flex flex-col items-center">
        <h1 className="text-black text-4xl font-black  mt-[150px] mb-[70px]">로그인</h1>
        <input type="text" className="rounded-lg border-solid border-2 border-[#D9D9D9] w-[25rem] h-[4.375rem] mb-[20px]" placeholder="이메일"></input>
        <input type="password" className="rounded-lg border-solid border-2 border-[#D9D9D9] w-[25rem] h-[4.375rem] mb-[30px]" placeholder="비밀번호"></input>
        <button className="rounded-lg text-black text-xl font-bold w-[25rem] h-[3.625rem] bg-[#6BD700] mb-[8px]">로그인</button>
        <Link href={"/signup"} className="rounded-lg text-black text-xl font-bold w-[25rem] h-[3.625rem] bg-[#f1f1f1] mb-[8px]">
          회원가입
        </Link>
        <Link href={"/"} className="rounded-lg  text-xl font-bold w-[25rem] h-[3.625rem] bg-[#000000] mb-[8px]">
          메인으로 이동
        </Link>
        <div className="icon flex items-center justify-center">
          <div className="relative w-5 h-5">
            <Image src={"/icons/video.png"} alt={`icon`} fill sizes="20" className="object-contain" />
          </div>
          <span>댄스</span>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
