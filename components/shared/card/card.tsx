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

import { Star, Folder, Pencil, Trash, Copy, ExternalLink } from "lucide-react";
import React from "react";
import Thumbnail from "./thumbnail";
import Avatar from "./avatar";
import { BookmarkProps } from "@/types/types";


const BookMarkCard = ({ bookmark }: { bookmark: BookmarkProps }) => {
  return (
    <Card
      key={bookmark.id}
      className="relative border bg-background gap-0 pt-5 pb-2 space-y-4"
    >
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between gap-3">
          <Avatar
            src={bookmark.faviconUrl!}
            alt={`${bookmark.title} favicon`}
          />
          {bookmark.isFavorite && (
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
          )}
        </div>
        <CardTitle className="text-lg text-primary line-clamp-2">
          {bookmark.title}
        </CardTitle>

        <CardDescription className="text-muted-foreground line-clamp-2 flex items-center gap-1.5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-6 h-6" strokeWidth={2} />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Visit Link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {bookmark.thumbnailUrl && (
          <Thumbnail
            src={bookmark.thumbnailUrl}
            height={192}
            width={192}
            alt={`${bookmark.title} thumbnail`}
            className="w-full h-48 object-cover rounded-md mb-3 border border-border"
          />
        )}
        <p className="text-base font-semibold line-clamp-2">
          {bookmark.description}
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
