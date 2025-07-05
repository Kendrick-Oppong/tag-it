import BookmarksClientWrapper from "@/components/dashboard/BookmarksClientWrapper";
import { fetchUserBookmarks, fetchUserData } from "@/lib/api";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


type Props = {
  params: Promise<{ collection: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function CollectionPage({
  params,
  searchParams,
}: Readonly<Props>) {
  const [{ collection }, { page }] = await Promise.all([params, searchParams]);

  const currentPage = Number(page) || 1;
  const collectionNameFromUrl = decodeURIComponent(collection).toLowerCase();

  // Fetch all collections for the user to verify collection existence
  const { collections } = await fetchUserData();

  const collectionExists = collections?.some(
    (col) => col.name.toLowerCase() === collectionNameFromUrl
  );

  if (!collectionExists) {
    notFound(); // 🚫 Collection doesn't exist
  }

  // fetch bookmarks for this collection
  const { bookmarks, totalCount, totalPages } = await fetchUserBookmarks(
    currentPage,
    collectionNameFromUrl
  );

  if (!bookmarks?.length) {
    return (
      <div className="flex pt-6 flex-col gap-5 items-center justify-center text-center mt-24 px-4">
        <div className="relative bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-full p-5 shadow-lg animate-pulse">
          <BookOpen className="size-10" />
        </div>
        <h2 className="text-2xl font-bold text-primary">No bookmarks yet</h2>
        <p className="max-w-md text-muted-foreground">
          You haven’t added any bookmarks to this collection. Start exploring
          and save your favorite items to easily access them later.
        </p>
        <Button className="text-base"><Link href="/bookmarks/create">Add Bookmark</Link> </Button>
      </div>
    );
  }

  return (
    <BookmarksClientWrapper
      bookmarks={bookmarks}
      collections={collections ?? []}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
}
