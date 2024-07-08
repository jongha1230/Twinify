import { PropsWithChildren } from "react";

function Page({ children }: PropsWithChildren) {
  return (
    <main className="w-[1440px] min-h-screen mx-auto bg-black">{children}</main>
  );
}

export default Page;
