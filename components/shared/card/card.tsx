import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Bookmark, Collection } from "@prisma/client";

import {
  Globe,
  Star,
  Folder,
  Pencil,
  Trash,
  Copy,
} from "lucide-react";
import Image from "next/image";
import React from "react";

type BookmarkProps = Bookmark & { collection: Collection | null };

const BookMarkCard = ({ bookmark }: { bookmark: BookmarkProps }) => {
  return (
    <Card
      key={bookmark.id}
      className="relative border bg-background gap-0 pt-5 pb-2 space-y-4"
    >
      <CardHeader>
        <div className="flex items-start gap-3">
          {bookmark.faviconUrl ? (
            <Image
              width={24}
              height={24}
              src={bookmark.faviconUrl}
              alt={`${bookmark.title} favicon`}
              className="h-6 w-6 rounded-full"
            />
          ) : (
            <Globe className="h-6 w-6 text-gray-400" />
          )}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg text-primary truncate">
                {bookmark.title}
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
                {bookmark.url}
              </a>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {bookmark.thumbnailUrl && (
          <Image
            src={
              bookmark.thumbnailUrl || "https://placehold.net/10-600x800.png"
            }
            height={192}
            width={192}
            priority
            quality={85}
            alt={`${bookmark.title} thumbnail`}
            className="w-full h-48 rounded-md mb-3 border border-border"
          />
        )}
        <p className="text-base font-semibold line-clamp-2">
          {bookmark.description || "No description"}
        </p>
      </CardContent>
      <CardFooter className="mt-auto w-full flex flex-col space-y-3">
        <div className="flex items-center w-full justify-between">
          <div>
            <Badge variant="outline" className="bg-border">
              <Folder className="h-3 w-3 mr-1" />
              {bookmark.collection?.name}
            </Badge>
          </div>
        </div>
        <div className="flex justify-between w-full text-primary">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookMarkCard;
