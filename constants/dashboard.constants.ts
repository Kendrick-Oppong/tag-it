import { NavigationData } from "@/interfaces/data.interfaces";
import { Collection } from "@prisma/client";



export const getNavigationData = (
  collections: Collection[]
): NavigationData => {
  return {
    navMain: [
      {
        title: "Bookmarks",
        url: "/bookmarks",
        isActive: true,
        subItems: [
          { title: "All", url: "/bookmarks/all" },
          ...(collections?.map((collection) => ({
            title: collection.name,
            url: `/bookmarks/${collection.name.toLowerCase()}`,
          })) ?? []),
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