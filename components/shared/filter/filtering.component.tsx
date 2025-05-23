"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search, SortAsc } from "lucide-react";
import { usePathname } from "next/navigation";

const FilteringComponent = () => {
  const pathname = usePathname();

  // Regex to hide on /create or /edit routes
  const hideFilter = /\/dashboard\/bookmarks\/(create|edit)/.test(pathname);

  if (hideFilter) {
    return null;
  }

  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search by title"
            className="w-full border-primary dark:border-border shadow-sm pl-10 pr-4 py-2"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10 border-primary dark:border-border font-normal text-muted-foreground text-base"
              >
                <SortAsc className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Title (A-Z)</DropdownMenuItem>
              <DropdownMenuItem>Title (Z-A)</DropdownMenuItem>
              <DropdownMenuItem>Date Added (Newest)</DropdownMenuItem>
              <DropdownMenuItem>Date Added (Oldest)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Select>
            <SelectTrigger className="w-[180px] border-primary dark:border-border">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bookmarks</SelectItem>
              <SelectItem value="favorites">Favorites</SelectItem>
              <SelectItem value="in-collection">In Collection</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
};

export default FilteringComponent;
