import { useMemo } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectBookmarkFilter } from "@/lib/redux/features/filter/bookmarkFilterSlice";
import { BookmarkProps } from "@/types/types";



export function useBookmarksFilter(bookmarks: BookmarkProps[]) {
  const { searchTerm, sortBy, filterBy } = useAppSelector(selectBookmarkFilter);

  const filteredBookmarks = useMemo(() => {
    let filtered = [...bookmarks];

    if (searchTerm) {
      filtered = filtered.filter((b) =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase())
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
