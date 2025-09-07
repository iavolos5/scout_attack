"use client";

import { usePathname } from "next/navigation";
import Headers from "./Headers/Headers";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showHeaders = pathname !== "/login";

  return (
    <>
      {showHeaders && <Headers />}
      {children}
    </>
  );
}