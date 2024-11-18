import { ReactNode } from "react";

interface NavBarProps {
  children: ReactNode;
}

function NavBar({ children }: NavBarProps) {
  return (
    <nav
      className={
        "flex justify-between items-center bg-popover shadow-sm w-full p-4 mb-10"
      }
    >
      {children}
    </nav>
  );
}

export default NavBar;
