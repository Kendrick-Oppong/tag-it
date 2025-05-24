"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Filter,
  Heart,
  Layers,
  List,
  Search,
  CalendarDays,
  Tag,
} from "lucide-react";
import { usePathname } from "next/navigation";

const FilteringComponent = () => {
  const pathname = usePathname();

  // Hide on /create or /edit routes
  const hideFilter = /\/dashboard\/bookmarks\/(create|edit)/.test(pathname);
  if (hideFilter) return null;

  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Input
            placeholder="Search by title"
            className="w-full border-primary dark:border-border shadow-sm pl-10 pr-4 py-2"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </div>

        {/* Filter + Sort */}
        <div className="flex items-center gap-3">
          {/* Sort Select */}
          <Select >
            <SelectTrigger className="w-[160px] border-primary dark:border-border">
              <List className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title-asc">
                <Tag className="mr-2 h-4 w-4" />
                Title (A-Z)
              </SelectItem>
              <SelectItem value="title-desc">
                <Tag className="mr-2 h-4 w-4" />
                Title (Z-A)
              </SelectItem>
              <SelectItem value="date-new">
                
                <CalendarDays className="mr-2 h-4 w-4" />
                Date (Newest)
              </SelectItem>
              <SelectItem value="date-old">
                <CalendarDays className="mr-2 h-4 w-4" />
                Date (Oldest)
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Select */}
          <Select>
            <SelectTrigger className="w-[180px] border-primary dark:border-border">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <List className="mr-2 h-4 w-4" />
                All Bookmarks
              </SelectItem>
              <SelectItem value="favorites">
                <Heart className="mr-2 h-4 w-4" />
                Favorites
              </SelectItem>
              <SelectItem value="in-collection">
                <Layers className="mr-2 h-4 w-4" />
                In Collection
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
};

export default FilteringComponent;
