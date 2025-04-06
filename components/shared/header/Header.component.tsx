import { navLinks } from "@/constants/header.constants";
import Link from "next/link";
import { ThemeToggle } from "../theme/theme-toggle";

const Header = () => {
  return (
    <header className="flex justify-between items-center border-b border-border p-3">
      <div>
        <h1 className="font-black text-2xl text-primary">
          Tag-<span className="text-destructive">It</span>
        </h1>
      </div>
      <ul className="flex justify-between gap-4 items-center ">
        {navLinks.map((link) => (
          <li
            key={link.name}
            className="font-medium hover:border hover:text-primary p-2 rounded-lg "
          >
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
      <ThemeToggle />
    </header>
  );
};

export default Header;
