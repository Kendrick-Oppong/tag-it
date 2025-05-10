import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SortAsc, Filter } from "lucide-react";

import BookMarkCard from "@/components/shared/card/card.component";

const mockBookmarks = [
  {
    id: "1",
    title: "React Docs",
    url: "https://react.dev",
    description: "Official React documentation",
    createdAt: "2025-05-01T00:00:00.000Z",
    updatedAt: "2025-05-01T00:00:00.000Z",
    isFavorite: true,
    revisitAt: "2025-05-15T00:00:00.000Z",
    faviconUrl: "https://react.dev/favicon.ico",
    thumbnailUrl:
      "https://plus.unsplash.com/premium_photo-1682091872078-46c5ed6a006d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    collection: { id: "c1", name: "Work" },
  },
  {
    id: "2",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "A utility-first CSS framework",
    createdAt: "2025-05-02T00:00:00.000Z",
    updatedAt: "2025-05-02T00:00:00.000Z",
    isFavorite: false,
    revisitAt: null,
    faviconUrl: "https://tailwindcss.com/favicon.ico",
    thumbnailUrl:
      "https://plus.unsplash.com/premium_photo-1682091872078-46c5ed6a006d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    collection: null,
  },
  {
    id: "3",
    title: "Next.js Guide",
    url: "https://nextjs.org",
    description: "The React framework for production",
    createdAt: "2025-05-03T00:00:00.000Z",
    updatedAt: "2025-05-03T00:00:00.000Z",
    isFavorite: true,
    revisitAt: "2025-05-20T00:00:00.000Z",
    faviconUrl: "https://tailwindcss.com/favicon.ico",
    thumbnailUrl:
      "https://plus.unsplash.com/premium_photo-1682091872078-46c5ed6a006d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    collection: { id: "c2", name: "Learning" },
  },
];

export default function AllBookmarks() {
  return (
    <main className="p-4">
      {/* Header Section */}
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

      {/* Bookmark Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBookmarks.map((bookmark) => (
          <BookMarkCard bookmark={bookmark} key={bookmark.id} />
        ))}
      </section>
    </main>
  );
}
