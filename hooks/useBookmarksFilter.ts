import { useEffect, useMemo } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectBookmarkFilter } from "@/lib/redux/features/filter/bookmarkFilterSlice";
import { BookmarkProps } from "@/types/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useBookmarksFilter(bookmarks: BookmarkProps[]) {
  const { searchTerm, sortBy, filterBy } = useAppSelector(selectBookmarkFilter);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Set or remove query parameters based on state
    if (searchTerm) {
      params.set("search", searchTerm.trim());
    } else {
      params.delete("search");
    }

    if (sortBy) {
      params.set("sort", sortBy);
    } else {
      params.delete("sort");
    }

    if (filterBy && filterBy !== "all") {
      params.set("filter", filterBy);
    } else {
      params.delete("filter");
    }

    // Push the new query string (shallow replace)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchTerm, sortBy, filterBy, searchParams, router, pathname]);

  const filteredBookmarks = useMemo(() => {
    let filtered = [...bookmarks];

    if (searchTerm) {
      filtered = filtered.filter((b) =>
        b.title.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
      );
    }

    if (filterBy === "favorites") {
      filtered = filtered.filter((b) => b.isFavorite);
    } else if (filterBy !== "all") {
      filtered = filtered.filter((b) => b.collection?.name === filterBy);
    }

    switch (sortBy) {
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-new":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "date-old":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
    }

    return filtered;
  }, [bookmarks, searchTerm, sortBy, filterBy]);

  return filteredBookmarks;
}
