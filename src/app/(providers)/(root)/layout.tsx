import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { PropsWithChildren } from "react";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <div id="root" className="flex flex-col max-w-[1440px] sm:max-w-[] min-h-screen mx-auto bg-black text-white">
      <div className="flex flex-1 gap-4">
        <Sidebar />
        <main className="flex-1 p-6">
          <Header />
          {children}
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
