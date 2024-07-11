import Providers from "@/providers/providers";
import React from "react";
function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
export default ProvidersLayout;
