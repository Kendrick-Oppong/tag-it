import Link from "next/link";
import { navLinks } from "@/constants/header.constants";
import { ThemeToggle } from "../theme/theme-toggle";
import HeaderMobileComponent from "./header.mobile.component";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

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
        <li className="font-medium">
          <Button>
            <LoginLink>Sign In</LoginLink>
          </Button>
        </li>
      </ul>

      <div className="flex justify-between gap-4 items-center">
        <ThemeToggle />
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <span className="text-foreground">N</span>
        </div>
        <HeaderMobileComponent />
      </div>
    </header>
  );
};

export default Header;
