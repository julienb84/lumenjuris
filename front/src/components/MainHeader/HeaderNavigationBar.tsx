// UI //
import { LogInIcon, FileCheckIcon, User, ScatterChartIcon } from "lucide-react";
import { Button } from "../ui/Button";

import { Link, useLocation } from "react-router-dom";

const HeaderNavigationBar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex items-center gap-2">
      <Link to="/inscription">
        <Button
          variant="ghost"
          size="lg"
          className={
            pathname === "/inscription"
              ? " text-gray-500 tracking-wide font-semibold text-[16px] hover:cursor-default"
              : "text-gray-400"
          }
        >
          <LogInIcon />
          Se connecter
        </Button>
      </Link>
      <Link to="/analyzer">
        <Button
          variant="ghost"
          size="lg"
          data-slot="icon"
          className={
            pathname === "/analyzer"
              ? "bg-lumenjuris text-lumenjuris-background tracking-wide font-semibold"
              : "text-gray-400"
          }
        >
          <FileCheckIcon />
          Analyse
        </Button>
      </Link>
      <Link to="/mon-compte">
        <Button
          variant="ghost"
          size="lg"
          className={
            pathname === "/mon-compte"
              ? "bg-lumenjuris text-lumenjuris-background tracking-wide font-semibold"
              : "text-gray-400"
          }
        >
          <User />
          Mon compte
        </Button>
      </Link>
      <Link to="/sandbox">
        <Button
          variant="ghost"
          size="lg"
          className={
            pathname === "/mon-compte"
              ? "bg-lumenjuris text-lumenjuris-background tracking-wide font-semibold"
              : "text-gray-400"
          }
        >
          <ScatterChartIcon />
          Sandbox
        </Button>
      </Link>
    </nav>
  );
};

export default HeaderNavigationBar;
