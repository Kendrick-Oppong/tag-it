import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { bookmarkSchema } from "@/validators/form";
import { Star, Folder, Calendar } from "lucide-react";
import { z } from "zod";

type Bookmark = z.infer<typeof bookmarkSchema>;

export default function BookmarkCardPreview({
  bookmark,
}: Readonly<{ bookmark: Bookmark }>) {
  return (
    <Card className="relative border bg-background gap-0 pt-5 pb-2 space-y-4">
      <CardHeader>
        <div className="flex items-start gap-3">
          <img
            src={
              bookmark.faviconUrl || "https://avatar.vercel.sh/rauchg?size=24"
            }
            alt={`${bookmark.title} favicon`}
            className="h-6 w-6 rounded-full"
          />

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg text-primary truncate">
                {bookmark.title || "Bookmark Title"}
              </CardTitle>
              {bookmark.isFavorite && (
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
              )}
            </div>
            <CardDescription className="text-gray-400 truncate">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {bookmark.url || "https://example.com"}
              </a>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <img
          src={bookmark.thumbnailUrl || "https://placehold.net/10-600x800.png"}
          alt={`${bookmark.title} thumbnail`}
          className="w-full h-40 object-cover rounded-md mb-3"
        />

        <p className="text-base font-semibold line-clamp-2">
          {bookmark.description || "No description"}
        </p>
      </CardContent>
      <CardFooter className="mt-auto w-full flex flex-col space-y-3">
        <div className="flex items-center w-full justify-between">
          <div>
            <Badge variant="outline" className="bg-border">
              <Folder className="h-3 w-3 mr-1" />
              Uncategorized
            </Badge>
          </div>
          <div>
            <Badge variant="outline">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date().toLocaleDateString()}
            </Badge>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
