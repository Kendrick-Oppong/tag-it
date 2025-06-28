import { NavigationData } from "@/interfaces/data.interfaces";
import { Collection } from "@prisma/client";



export const getNavigationData = (
  collections: Collection[]
): NavigationData => {
  return {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "https://avatar.vercel.sh/rauchg?size=20",
    },
    navMain: [
      {
        title: "Bookmarks",
        url: "/bookmarks",
        isActive: true,
        subItems: [
          { title: "All", url: "/bookmarks/all" },
          { title: "Favorites", url: "/bookmarks/favorites" },
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