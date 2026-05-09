import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex bg-background">
      <Sidebar />
      <main className="flex-1 min-w-0 p-5 md:p-8 lg:p-10 pb-24 lg:pb-10">{children}</main>
      <MobileNav />
    </div>
  );
}
