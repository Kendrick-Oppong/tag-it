"use client";

import { BookOpen } from "lucide-react";
import type { Collection } from "@prisma/client";

import FilteringComponent from "@/components/shared/filter/filtering.component";
import BookMarkCard from "@/components/shared/card/card";
import { useBookmarksFilter } from "@/hooks/useBookmarksFilter";
import { BookmarkProps } from "@/types/types";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  selectHighlightedBookmarkId,
  setHighlightedBookmarkId,
} from "@/lib/redux/features/ui/uiSlice";
import { useBreadcrumb } from "@/hooks/use-Breadcrumb";

export default function BookmarksClientWrapper({
  bookmarks,
  collections,
}: Readonly<{
  bookmarks: BookmarkProps[];
  collections: Collection[];
}>) {
  const filteredBookmarks = useBookmarksFilter(bookmarks);
  const dispatch = useAppDispatch();
  const highlightId = useAppSelector(selectHighlightedBookmarkId);
  const {capitalize,subcategory } = useBreadcrumb()
  
  // 🧼 Auto-clear highlight after 3 seconds
  useEffect(() => {
    if (highlightId) {
      const timer = setTimeout(() => {
        dispatch(setHighlightedBookmarkId(null));
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, highlightId]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between my-4">
        <h1 className="text-xl font-bold">
          Bookmarks -  <span className="text-primary">{capitalize(subcategory)}</span> 
        </h1>
        <p className="font-semibold">
          Total{" "}
          <span className="text-destructive">({filteredBookmarks.length})</span>
        </p>
      </div>
      <FilteringComponent collections={collections} />
      {filteredBookmarks.length > 0 ? (
        <section className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-3 mt-6">
          {filteredBookmarks.map((bookmark) => (
            <BookMarkCard
              bookmark={bookmark}
              key={bookmark?.id}
              highlight={bookmark.id === highlightId}
            />
          ))}
        </section>
      ) : (
        <div className="flex flex-col gap-5 items-center justify-center text-center mt-16 px-4">
          <div className="relative bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-full p-5 shadow-lg animate-pulse">
            <BookOpen className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-primary">
            No bookmarks found
          </h2>
          <p className="max-w-md text-muted-foreground">
            Try adjusting your filters or search term.
          </p>
        </div>
      )}
    </div>
  );
}
