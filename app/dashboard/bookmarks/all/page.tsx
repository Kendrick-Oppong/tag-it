"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Star,
  Calendar,
  Folder,
  SortAsc,
  Filter,
  Globe,
  Pencil,
  Copy,
  Trash,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
          <Card
            key={bookmark.id}
            className="relative border bg-background gap-0 pt-5 pb-2 space-y-4"
          >
            <CardHeader>
              <div className="flex items-start gap-3">
                {bookmark.faviconUrl ? (
                  <img
                    src={bookmark.faviconUrl}
                    alt={`${bookmark.title} favicon`}
                    className="h-6 w-6 rounded-full"
                  />
                ) : (
                  <Globe className="h-6 w-6 text-gray-400" />
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-primary truncate">
                      {bookmark.title}
                    </CardTitle>
                    {bookmark.isFavorite && (
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    )}
                  </div>
                  <CardDescription className="text-gray-400 truncate">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {bookmark.url}
                    </a>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {bookmark.thumbnailUrl && (
                <img
                  src={bookmark.thumbnailUrl}
                  alt={`${bookmark.title} thumbnail`}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <p className="text-lg font-semibold line-clamp-2">
                {bookmark.description || "No description"}
              </p>
            </CardContent>
            <CardFooter className="mt-auto w-full flex flex-col space-y-3">
              <div className="flex items-center w-full justify-between">
                <div>
                  {bookmark.collection && (
                    <Badge variant="outline" className="bg-border">
                      <Folder className="h-3 w-3 mr-1" />
                      {bookmark.collection.name}
                    </Badge>
                  )}
                </div>
                <div>
                  {bookmark.revisitAt && (
                    <Badge variant="outline" >
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(bookmark.revisitAt).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex justify-between w-full text-primary">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Bookmark</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete Bookmark</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy Link</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardFooter>
          </Card>
        ))}
        {mockBookmarks.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">
            No bookmarks yet. Create one to get started!
          </div>
        )}
      </section>
    </main>
  );
}
