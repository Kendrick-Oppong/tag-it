import { Bookmark, FolderKanban, Plus } from "lucide-react";

export const navigationData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://avatar.vercel.sh/rauchg?size=20",
  },
  navMain: [
    {
      title: "Bookmarks",
      url: "/dashboard/bookmarks",
      icon: Bookmark,
      isActive: true,
      subItems: [
        { title: "All", url: "/dashboard/bookmarks/all" },
        { title: "Favorites", url: "/dashboard/bookmarks/favorites" },
      ],
    },
    {
      title: "Collections",
      url: "/dashboard/collections",
      icon: FolderKanban,
      isActive: false,
      subItems: [],
    },

    // {
    //   title: "Revisit Later",
    //   url: "/dashboard/reminders",
    //   icon: Clock,
    //   isActive: false,
    //   subItems: [
    //     { title: "Today", url: "/dashboard/reminders/today" },
    //     { title: "This Week", url: "/dashboard/reminders/week" },
    //     { title: "Overdue", url: "/dashboard/reminders/overdue" },
    //   ],
    // },
    {
      title: "New Bookmark",
      url: "/dashboard/bookmarks",
      icon: Plus,
      isActive: false,
      subItems: [{ title: "Create", url: "/dashboard/bookmarks/create" }],
    },
  ],
};
