import { NavigationData } from "@/interfaces/data.interfaces";

export const getNavigationData = (): NavigationData => {
  return {
    navMain: [
      {
        title: "Bookmarks",
        url: "/bookmarks",
        isActive: true,
        subItems: [
          { title: "Bookmarks", url: "/bookmarks/all" },
        ],
      },
      {
        title: "New Bookmark",
        url: "/bookmarks/create",
        isActive: false,
        subItems: [{ title: "Create", url: "/bookmarks/create" }],
      },
    ],
  };
};