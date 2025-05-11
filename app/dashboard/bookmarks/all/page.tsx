import BookMarkCard from "@/components/shared/card/card.component";

const mockBookmarks = [
  {
    id: "1",
    title: "React Docs",
    url: "https://react.dev",
    description: "Official React documentation",
    createdAt: "2025-05-01T00:00:00.000Z",
    updatedAt: "2025-05-01T00:00:00.000Z",
    isFavorite: true,
    revisitAt: "2025-05-15T00:00:00.000Z",
    faviconUrl: "https://react.dev/favicon.ico",
    thumbnailUrl:
      "https://plus.unsplash.com/premium_photo-1682091872078-46c5ed6a006d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    collection: { id: "c1", name: "Work" },
  },
  {
    id: "2",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "A utility-first CSS framework",
    createdAt: "2025-05-02T00:00:00.000Z",
    updatedAt: "2025-05-02T00:00:00.000Z",
    isFavorite: false,
    revisitAt: null,
    faviconUrl: "https://tailwindcss.com/favicon.ico",
    thumbnailUrl:
      "https://plus.unsplash.com/premium_photo-1682091872078-46c5ed6a006d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    collection: null,
  },
  {
    id: "3",
    title: "Next.js Guide",
    url: "https://nextjs.org",
    description: "The React framework for production",
    createdAt: "2025-05-03T00:00:00.000Z",
    updatedAt: "2025-05-03T00:00:00.000Z",
    isFavorite: true,
    revisitAt: "2025-05-20T00:00:00.000Z",
    faviconUrl: "https://tailwindcss.com/favicon.ico",
    thumbnailUrl:
      "https://plus.unsplash.com/premium_photo-1682091872078-46c5ed6a006d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    collection: { id: "c2", name: "Learning" },
  },
];

export default function AllBookmarks() {
  return (
    <main className="p-4">
      {/* Bookmark Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBookmarks.map((bookmark) => (
          <BookMarkCard bookmark={bookmark} key={bookmark.id} />
        ))}
      </section>
    </main>
  );
}
