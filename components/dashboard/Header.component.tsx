import Link from "next/link";
import React from "react";
import { ThemeToggle } from "@/components/shared/theme/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Search, LogOut } from "lucide-react";
import HeaderMobileComponent from "../shared/header/header.mobile.component";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarImage} from "@/components/ui/avatar"
import { Separator } from "../ui/separator";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";



const HeaderComponent = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

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

        <ThemeToggle />
            <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar  className="h-8 w-8 rounded-md">
              <AvatarImage src={user?.picture as string} alt="profile" />
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end"  className="z-[10000]">
              <DropdownMenuItem className="hover:bg-secondary/30 dark:hover:bg-muted">
                <BadgeCheck className="mr-2 h-4 w-4" />
                Account
              </DropdownMenuItem>
              <Separator/>
              <DropdownMenuItem className="hover:bg-secondary/30 dark:hover:bg-muted">
                 <LogoutLink className="flex items-center gap-2">
                 <LogOut className="mr-2 h-4 w-4" />
                 Log out
                              </LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
       
        

        <HeaderMobileComponent />
      </div>
    </header>
  );
};

export default HeaderComponent;
