// 공통된 레이아웃 적용

import { PropsWithChildren } from "react";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <div id="root">
      {/* 헤더 추가 */}
      {children}
    </div>
  );
}

export default RootLayout;
