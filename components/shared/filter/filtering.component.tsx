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

const FilteringComponent = () => {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold">All Bookmarks</h1>
        <p className="font-semibold">
          Total <span className="text-destructive">(3)</span>
        </p>
      </div>

      {/* Search and Sorting/Filtering Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search by title"
            className="w-full border-primary dark:border-border shadow-sm pl-10 pr-4 py-2"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
              <Button
                variant="outline"
                className="border-primary dark:border-border font-normal text-muted-foreground text-base"
              >
                <SortAsc className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <DropdownMenuItem className="">Title (A-Z)</DropdownMenuItem>
              <DropdownMenuItem className="">Title (Z-A)</DropdownMenuItem>
              <DropdownMenuItem className="">
                Date Added (Newest)
              </DropdownMenuItem>
              <DropdownMenuItem className="">
                Date Added (Oldest)
              </DropdownMenuItem>
              <DropdownMenuItem className="">
                Revisit Date (Soonest)
              </DropdownMenuItem>
              <DropdownMenuItem className="">
                Revisit Date (Latest)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Select>
            <SelectTrigger className="w-[180px] border-primary dark:border-border">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="all">All Bookmarks</SelectItem>
              <SelectItem value="favorites">Favorites</SelectItem>
              <SelectItem value="revisit">Revisit Later</SelectItem>
              <SelectItem value="in-collection">In Collection</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
};

export default FilteringComponent;
