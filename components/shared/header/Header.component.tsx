import Link from "next/link";
import { Search } from "lucide-react";
import { navLinks } from "@/constants/header.constants";
import { ThemeToggle } from "../theme/theme-toggle";
import HeaderMobileComponent from "./header.mobile.component";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed left-0 bg-background right-0 w-full top-0 z-[800] flex justify-between items-center border-b border-border py-3 px-5">
      {/* Logo */}
      <div>
        <Link href="/">
          <h1 className="font-black text-2xl text-primary">
            Tag-<span className="text-destructive">It</span>
          </h1>
        </Link>
      </div>

      {/* Navigation Links (Desktop) */}
      <ul className="hidden sm:flex justify-between gap-4 items-center">
        {navLinks.map((link) => (
          <li
            key={link.name}
            className="font-medium hover:border hover:text-primary p-2 rounded-lg"
          >
            <Link href={`${link.href}`}>{link.name}</Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-between gap-4 items-center">
        <Button name="search" variant="ghost" size="icon" aria-label="Toggle global search">
          <Search size={20} />
        </Button>

        <ThemeToggle />
        <HeaderMobileComponent />
      </div>
    </header>
  );
};

export default Header;
