"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  List,
  Search,
  CalendarDays,
  ArrowDownAZ,
  ArrowUpZA,
  Folder,
} from "lucide-react";
import { Collection } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  selectBookmarkFilter,
  setFilterBy,
  setSearchTerm,
  setSortBy,
} from "@/lib/redux/features/filter/bookmarkFilterSlice";
import { SortOption } from "@/types/types";

const FilteringComponent = ({
  collections,
}: {
  collections?: Collection[];
}) => {
  const dispatch = useAppDispatch();
  const { searchTerm, sortBy, filterBy } = useAppSelector(selectBookmarkFilter);

  
  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Input
            placeholder="Search by title"
            className="w-full border-primary dark:border-border shadow-sm pl-10 pr-4 py-2"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </div>

        {/* Filter + Sort */}
        <div className="flex items-center gap-3">
          {/* Sort Select */}
          <Select
            value={sortBy}
            onValueChange={(value) => dispatch(setSortBy(value as SortOption))}
          >
            <SelectTrigger className="w-[200px] border-primary dark:border-border">
              {/* <List className="mr-2 h-4 w-4" /> */}
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title-asc">
                <ArrowDownAZ className="mr-2 h-4 w-4" />
                Title (A-Z)
              </SelectItem>
              <SelectItem value="title-desc">
                <ArrowUpZA className="mr-2 h-4 w-4" />
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

          <Select
            value={filterBy}
            onValueChange={(value) => dispatch(setFilterBy(value))}
          >
            <SelectTrigger className="w-[200px] border-primary dark:border-border">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>General</SelectLabel>
                <Separator />
                <SelectItem value="all">
                  <List className="mr-2 h-4 w-4" />
                  All
                </SelectItem>
                <SelectItem value="favorites">
                  <Heart className="mr-2 h-4 w-4" />
                  Favorites
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Collections</SelectLabel>
                <Separator />

                {collections?.map((collection) => (
                  <SelectItem key={collection.id} value={collection.name}>
                    <Folder className="mr-2 h-4 w-4" />
                    {collection.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
};

export default FilteringComponent;
