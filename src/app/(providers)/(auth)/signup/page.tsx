function SignupPage() {
  return (
    <div className="flex flex-col items-center w-[43.75rem] h-[48.75rem] bg-white p-6 box-border">
      <div className="flex ml-auto mb-[60px] gap-1">
        <p className="text-black">계정이 있으신가요? </p>
        <p className="text-[#6BD700]">로그인하기</p>
      </div>
      <form className="flex flex-col items-center gap-5">
        <h1 className="text-black text-4xl font-black mb-[8px]">환영합니다!</h1>
        <input type="text" className="rounded-lg border-solid border-2 border-[#D9D9D9] w-[25rem] h-[4.375rem]" placeholder="닉네임"></input>
        <input type="text" className="rounded-lg border-solid border-2 border-[#D9D9D9] w-[25rem] h-[4.375rem]" placeholder="이메일"></input>
        <input type="password" className="rounded-lg border-solid border-2 border-[#D9D9D9] w-[25rem] h-[4.375rem]" placeholder="비밀번호"></input>
        <input type="password" className="rounded-lg border-solid border-2 border-[#D9D9D9] w-[25rem] h-[4.375rem]" placeholder="비밀번호 확인"></input>
        <button className="rounded-lg text-black text-xl font-bold w-[25rem] h-[3.625rem] bg-[#6BD700] mt-[8px]">회원가입</button>
      </form>
      <p className="mt-[60px] text-black">By continuing you indicate that you read and agreed to the Terms of Use</p>
    </div>
  );
}

export default SignupPage;
