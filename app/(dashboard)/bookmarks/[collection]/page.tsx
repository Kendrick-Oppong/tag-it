import BookmarksClientWrapper from "@/components/dashboard/BookmarksClientWrapper";
import { fetchUserBookmarks } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function CollectionPage({
  params,
}: Readonly<{
  params: Promise<{ collection: string }>;
}>) {
  const [{ bookmarks }, { collection }] = await Promise.all([
    fetchUserBookmarks(),
    params,
  ]);

  const collectionNameFromUrl = decodeURIComponent(collection).toLowerCase();

  const collectionBookmarks = bookmarks?.filter(
    (b) => b.collection?.name.toLowerCase() === collectionNameFromUrl
  );

  if (!collectionBookmarks?.length) {
    notFound();
  }

  return (
    <BookmarksClientWrapper
      bookmarks={collectionBookmarks}
      collections={[]} 
    />
  );
}
