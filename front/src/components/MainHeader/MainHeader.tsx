// UI //
import { Scale } from "lucide-react";

import HeaderNavigationBar from "./HeaderNavigationBar";

import { Link, useLocation } from "react-router-dom";

const MainHeader = () => {
  const { pathname } = useLocation();

  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between sticky top-0 z-10">
      <div className="w-[1280px] mx-auto px-4 flex justify-between h-full">
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lumenjuris">
            <Scale className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-lumenjuris tracking-tight">
              LumenJuris
            </span>
            <span className="text-[10px] text-gray-400 leading-none">
              Conformité RH
            </span>
          </div>
        </Link>
        <HeaderNavigationBar />
      </div>
    </header>
  );
};

export default MainHeader;
