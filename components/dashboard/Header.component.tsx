import Link from "next/link";
import React from "react";
import { ThemeToggle } from "@/components/shared/theme/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import HeaderMobileComponent from "../shared/header/header.mobile.component";

const HeaderComponent = () => {
  return (
    <header className="fixed left-0 bg-background right-0 w-full top-0 z-[800] flex justify-between items-center border-b border-border py-3 px-5">
      <div className="">
        <Link href="/">
          <h1 className="font-black text-2xl text-primary">
            Tag-<span className="text-destructive">It</span>
          </h1>
        </Link>
      </div>

      <div className="w-[70%] hidden md:inline-flex">
        <Input
          type="search"
          placeholder="Search all bookmarks..."
          className="border-primary dark:border-border"
        />
      </div>
      <div className="flex justify-between gap-4 items-center">
        <Button
          name="search"
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle global search"
        >
          <Search size={20} />
        </Button>
        <Link href='/dashboard/bookmarks/create'>
          <Button variant="ghost" title="Add Bookmark">
            <Plus className="size-6 text-primary" strokeWidth={2} size={18} />
          </Button>
        </Link>
        <ThemeToggle />
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <span className="text-foreground font-bold">N</span>
        </div>
        <HeaderMobileComponent />
      </div>
    </header>
  );
};

export default HeaderComponent;
