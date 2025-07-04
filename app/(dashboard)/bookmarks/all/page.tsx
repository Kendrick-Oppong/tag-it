import BookmarksClientWrapper from "@/components/dashboard/BookmarksClientWrapper";
import { fetchUserBookmarks, fetchUserData } from "@/lib/api";
import { BookOpen } from "lucide-react";

export default async function AllBookmarks() {
  const [{ bookmarks }, { collections }] = await Promise.all([
    fetchUserBookmarks(),
    fetchUserData(),
  ]);

  if (!bookmarks?.length) {
    return (
      <div className="flex pt-6 flex-col gap-5 items-center justify-center text-center mt-32 px-4">
        <div className="relative bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-full p-5 shadow-lg animate-pulse">
          <BookOpen className="size-10" />
        </div>
        <h2 className="text-2xl font-bold text-primary">No bookmarks yet</h2>
        <p className="max-w-md text-muted-foreground">
          You haven’t added any bookmarks. Start exploring and save your
          favorite items to easily access them later.
        </p>
      </div>
    );
  }

  return (
    <BookmarksClientWrapper
      bookmarks={bookmarks}
      collections={collections ?? []}
    />
  );
}
