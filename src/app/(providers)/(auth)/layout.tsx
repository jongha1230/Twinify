import { PropsWithChildren } from "react";

function AuthLayout({ children }: PropsWithChildren) {
  return <div className="flex flex-col items-center justify-center mt-10">{children}</div>;
}

export default AuthLayout;
