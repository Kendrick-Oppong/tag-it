import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
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

import {
  Star,
  Folder,
  Pencil,
  Trash,
  Copy,
  ExternalLink,
  Loader,
} from "lucide-react";
import React, { useState } from "react";
import Thumbnail from "./thumbnail";
import Avatar from "./avatar";
import { BookmarkProps } from "@/types/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteBookmark } from "@/lib/actions/delete-bookmark.action";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

const BookMarkCard = ({
  bookmark,
  highlight = false,
}: {
  bookmark: BookmarkProps;
  highlight: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const { execute: executeDelete, isPending: isDeleting } = useAction(
    deleteBookmark,
    {
      onSuccess: ({ data }) => {
        if (data?.success) {
          toast.success(data?.message ?? "Bookmark deleted");
          setOpen(false);
        } else {
          toast.error(data?.message ?? "Failed to delete bookmark");
        }
      },
      onError: () => toast.error("Failed to delete bookmark"),
    }
  );

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(bookmark.url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Unable to copy link");
    }
  };

  return (
    <Card
      key={bookmark.id}
      className={`relative border bg-background pt-5 gap-0 pb-2 space-y-4 transition-all duration-500 ${
        highlight ? "border-[1.5px] animate-pulse-border" : ""
      }`}
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
                <AlertDialog open={open || isDeleting} onOpenChange={setOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpen(true)}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete bookmark?</AlertDialogTitle>
                      <AlertDialogDescription className="text-base">
                        <p>
                          {" "}
                          Are you absolutely sure? you want to delete{" "}
                          <strong className="text-destructive">
                            &quot;{bookmark.title}&quot;
                          </strong>{" "}
                          ?
                        </p>

                        <p>
                          This action cannot be undone. This will permanently
                          delete the bookmark
                        </p>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mx-auto">
                      <AlertDialogCancel
                        disabled={isDeleting}
                        className={buttonVariants({
                          variant: "default",
                          className: "hover:text-white",
                        })}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        disabled={isDeleting}
                        className={buttonVariants({
                          variant: "destructive",
                        })}
                        onClick={() => executeDelete({ id: bookmark.id })}
                      >
                        {isDeleting ? (
                          <>
                            <Loader className="h-4 w-4 animate-spin" />
                            Deleting
                          </>
                        ) : (
                          "Delete"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onCopy}>
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy Link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookMarkCard;
