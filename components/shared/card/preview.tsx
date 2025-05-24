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
import { Collection } from "@prisma/client";
import { Star, Folder, Calendar } from "lucide-react";
import { z } from "zod";
import Thumbnail from "./thumbnail";
import Avatar from "./avatar";

type Bookmark = z.infer<typeof bookmarkSchema>;

export default function BookmarkCardPreview({
  bookmark,
  collections,
}: Readonly<{
  bookmark: Bookmark;
  collections: Collection[];
}>) {
  const collectionName =
    collections.find((c) => c.id === bookmark.collectionId)?.name ||
    "Uncategorized";

  return (
    <Card className="relative border bg-background gap-0 pt-5 pb-2 space-y-4">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Avatar
            src={bookmark.faviconUrl!}
            alt={`${bookmark.title} favicon`}
          />

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg text-primary truncate">
                {bookmark.title || "Bookmark Title"}
              </CardTitle>
              {bookmark.isFavorite && (
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
              )}
            </div>
            <CardDescription className="text-muted-foreground truncate">
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
        <Thumbnail
          src={bookmark.thumbnailUrl!}
          alt={`${bookmark.title} thumbnail`}
          className="w-full h-48 object-cover rounded-md mb-3"
          height={192}
          width={192}
        />

        <p className="text-base font-semibold line-clamp-2">
          {bookmark.description ?? "No description"}
        </p>
      </CardContent>
      <CardFooter className="mt-auto w-full flex flex-col space-y-3">
        <div className="flex items-center w-full justify-between">
          <div>
            <Badge variant="outline" className="bg-border">
              <Folder className="h-3 w-3 mr-1" />
              {collectionName || "Uncategorized"}
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
