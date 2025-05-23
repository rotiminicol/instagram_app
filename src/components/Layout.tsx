import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { MobileNavbar } from "./MobileNavbar";

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="relative pb-20 min-h-screen">
      {children ?? <Outlet />}
      <MobileNavbar />
    </div>
  );
};

export default Layout;