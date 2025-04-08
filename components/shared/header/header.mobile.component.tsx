import { navLinks } from "@/constants/header.constants";
import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const HeaderMobileComponent = () => {
  return (
  
      <Sheet>
        <SheetTrigger className="cursor-pointer rounded-lg sm:hidden">
          <Menu size={32} />
        </SheetTrigger>
        <SheetContent side="left" className="bg-secondary px-5 z-[1000]">
          <SheetHeader>
            <SheetTitle>
              <p className="font-black text-left text-2xl text-primary">
                Tag-<span className="text-destructive">It</span>
              </p>
            </SheetTitle>
            <SheetDescription className="sr-only">
              Mobile navigation menu for Tag-It
            </SheetDescription>
          </SheetHeader>
          <ul className="flex flex-col gap-4 ">
            {navLinks.map((link) => (
              <li key={link.name}>
                <SheetClose asChild>
                  <Link
                    href={`/${link.href}`}
                    className="block font-medium text-gray-900 dark:text-white hover:text-primary hover:border hover:border-primary p-3 rounded-lg transition-colors"
                  >
                    {link.name}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    
  );
};

export default HeaderMobileComponent;
