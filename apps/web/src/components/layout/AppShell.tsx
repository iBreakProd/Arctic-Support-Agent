import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <Sidebar />
      <MobileHeader />
      {children}
    </>
  );
}
