import BookMarkCard from "@/components/shared/card/card";
import FilteringComponent from "@/components/shared/filter/filtering.component";
import { fetchUserBookmarks } from "@/lib/api";
import { BookOpen } from "lucide-react";

export default async function AllBookmarks() {
  const { bookmarks } = await fetchUserBookmarks();
  const hasBookmarks = bookmarks && bookmarks.length > 0;

  return (
    <div className="p-6">
      {hasBookmarks ? (
        <>
          <div className="flex items-center justify-between my-4">
            <h1 className="text-3xl font-bold">All Bookmarks</h1>
            <p className="font-semibold">
              Total{" "}
              <span className="text-destructive">({bookmarks.length})</span>
            </p>
          </div>
          <FilteringComponent />
          <section className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-3 mt-6">
            {bookmarks.map((bookmark) => (
              <BookMarkCard bookmark={bookmark} key={bookmark?.id} />
            ))}
          </section>
        </>
      ) : (
        <div className="flex flex-col gap-5 items-center justify-center text-center mt-32 px-4 ">
          <div className="relative bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-full p-5 shadow-lganimate-pulse">
            <BookOpen className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-primary">
            No bookmarks yet
          </h2>
          <p className="max-w-md text-muted-foreground">
            You haven’t added any bookmarks. Start exploring and save your
            favorite items to easily access them later.
          </p>
        </div>
      )}
    </div>
  );
}
