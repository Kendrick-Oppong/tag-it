import { usePathname } from "next/navigation";

export function useBreadcrumb() {
  const pathname = usePathname(); // e.g., "/dashboard/bookmarks/all" or "/dashboard/bookmarks/all?sort=asc"

  // Split the pathname by '/' and filter out empty segments
  const pathSegments = pathname.split("/").filter(Boolean); // ["dashboard", "bookmarks", "all"]

  // Exclude the first segment ("dashboard") and take the remaining segments
  const relevantSegments = pathSegments.slice(1); // ["bookmarks", "all"]

  // Extract category and subcategory
  const category = relevantSegments[0] || ""; // "bookmarks"
  const subcategory = relevantSegments[1] || ""; // "all"

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  return { category, subcategory, capitalize };
}
