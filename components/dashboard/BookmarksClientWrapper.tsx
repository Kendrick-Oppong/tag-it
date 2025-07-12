"use client";
import { BookOpen } from "lucide-react";
import BookMarkCard from "../shared/card/card";
import FilteringComponent from "../shared/filter/filtering.component";
import PaginationTabs from "../shared/filter/paginationTabs";
import {
  selectHighlightedBookmarkId,
  setHighlightedBookmarkId,
} from "@/lib/redux/features/ui/uiSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useBookmarksFilter } from "@/hooks/useBookmarksFilter";
import { useBreadcrumb } from "@/hooks/use-Breadcrumb";
import { BookmarkProps } from "@/types/types";
import { Collection } from "@prisma/client";

export default function BookmarksClientWrapper({
  bookmarks,
  collections,
  totalCount,
  totalPages,
  currentPage,
}: Readonly<{
  bookmarks: BookmarkProps[];
  collections: Collection[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}>) {
  const dispatch = useAppDispatch();
  const highlightId = useAppSelector(selectHighlightedBookmarkId);
  const { capitalize, subcategory } = useBreadcrumb();
  const filteredBookmarks = useBookmarksFilter(bookmarks);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    if (highlightId) {
      const timer = setTimeout(() => {
        dispatch(setHighlightedBookmarkId(null));
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, highlightId]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between my-4">
        <h1 className="text-xl font-bold">
          Bookmarks -{" "}
          <span className="text-primary">{capitalize(subcategory)}</span>
        </h1>

        <p className="font-bold text-sm text-muted-foreground">
          Showing{" "}
          <span className="text-primary">
            {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)}
          </span>{" "}
          of <span className="text-destructive">{totalCount}</span> bookmarks
        </p>
      </div>

      <FilteringComponent collections={collections} />

      {filteredBookmarks.length > 0 ? (
        <>
          <section className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-3 mt-6">
            {filteredBookmarks.map((bookmark) => (
              <BookMarkCard
                bookmark={bookmark}
                key={bookmark?.id}
                highlight={bookmark.id === highlightId}
              />
            ))}
          </section>
          {totalCount > 5 && (
            <PaginationTabs totalPages={totalPages} currentPage={currentPage} />
          )}
        </>
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
