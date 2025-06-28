import { Bookmark, Collection } from "@prisma/client";

export type SortOption = "title-asc" | "title-desc" | "date-new" | "date-old";

export type BookmarkProps = Bookmark & { collection: Collection | null };

export interface BookmarkFilterState {
  searchTerm: string;
  sortBy: SortOption;
  filterBy: string;
}
