"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { Loader, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { createCollection } from "@/lib/actions/create-collection.action";
import { collectionSchema } from "@/validators/form";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collection } from "@prisma/client";

type FormData = z.infer<typeof collectionSchema>;

export function CreateFolderModal({
  children,
  collections = [],
}: Readonly<{ 
  children: React.ReactNode;
  collections?: Collection[];
}>) {
  const [open, setOpen] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: "",
    },
  });

  const collectionsCount = collections.length;

  const { execute, isPending } = useAction(createCollection, {
    onError: ({ error }) => {
      if (error) {
        const errorMessage = error?.validationErrors?.fieldErrors?.name?.[0];
        toast.error(errorMessage);
      }
      if (error.serverError) {
        toast.error("Failed to create folder");
      }
    },

    onSuccess: ({ data }) => {
      if (data?.type === "collection_exists") {
        toast.error(data.message);
      }

      if (data?.type === "max_collections_reached") {
        toast.error(data.message);
      }

      if (data?.success) {
        toast.success(data?.message);
        form.reset({});
        setOpen(false);
      }
    },
  });

  const onSubmit = (data: FormData) => {
    execute(data);
  };

  const isMaxReached = collectionsCount >= 15;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="z-[1000]"
        // prevent accidental close
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>

        {isMaxReached && (
          <Alert className="border-destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Maximum limit of 15 collections reached. Please delete some collections before creating new ones.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-muted-foreground">
          Collections: {collectionsCount}/15
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="border-primary dark:border-border"
                      placeholder="Enter folder name"
                      disabled={isMaxReached}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-3">
              <Button 
                className="text-base" 
                disabled={isPending || isMaxReached} 
                type="submit"
              >
                {isPending ? (
                  <>
                    <Loader className="animate-spin" /> Creating{" "}
                  </>
                ) : (
                  "Create Folder"
                )}
              </Button>

              {/* Close button inside dialog */}
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={isPending}
                  className="text-base"
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
