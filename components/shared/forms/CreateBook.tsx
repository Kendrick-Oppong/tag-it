"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import BookmarkCardPreview from "@/components/shared/card/preview";
import { bookmarkSchema } from "@/validators/form";
import { useFetchBookmarkMetadata } from "@/hooks/useFetchBookmarkMetadata";
import { Asterisk, Loader } from "lucide-react";
import { z } from "zod";
import { createBookmark } from "@/lib/actions/create-bookmark.action";
import { useAction } from "next-safe-action/hooks";
import { Collection } from "@prisma/client";
import { toast } from "sonner";

export default function CreateBookmark({
  collections,
}: Readonly<{
  collections: Collection[];
}>) {
  const form = useForm({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      title: "",
      url: "https://vercel.com/",
      description: "",
      isFavorite: false,
      faviconUrl: "",
      thumbnailUrl: "",
      metadata: "",
      collectionId: "",
    },
  });

  const url = form.watch("url");
  const formValues = form.watch();
  useFetchBookmarkMetadata(url, form);

  const { execute, result, isPending } = useAction(createBookmark, {
    onError: () => {
      toast.error("Failed to create bookmark");
    },

    onSuccess: ({ data }) => {
      toast.success(data?.message);
      form.reset({});
    },
  });

  function onSubmit(values: z.infer<typeof bookmarkSchema>) {
    execute(values);
    console.log("result.serverError", result);
    console.log("result.validationErrors", result);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl text-center font-bold mb-8">
        Create a New Bookmark
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border border-border p-2 rounded-lg">
        {/* Form Section */}
        <div className="p-6 rounded-lg border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title <Asterisk size={14} />
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter bookmark title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      URL <Asterisk size={14} />
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="url"
                        placeholder="https://example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {collections.length > 0 && (
                <FormField
                  control={form.control}
                  name="collectionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Collection Type</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={`w-full ${
                              form.formState.errors.collectionId?.message
                                ? "border-destructive"
                                : ""
                            }`}
                          >
                            <SelectValue
                              className="text-sm"
                              placeholder="Select a collection"
                            />
                          </SelectTrigger>
                          <SelectContent className="text-base">
                            {collections.map((collection) => (
                              <SelectItem
                                className="w-full"
                                key={collection.id}
                                value={collection.id}
                              >
                                {collection.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (auto-fetched)</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        className="h-10"
                        placeholder="Type your message here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isFavorite"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        disabled={isPending}
                        className="size-7"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-medium">
                      Mark as Favorite
                    </FormLabel>
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  disabled={isPending}
                  variant="destructive"
                  onClick={() => form.reset()}
                >
                  Clear
                </Button>
                <Button disabled={isPending} type="submit">
                  {isPending ? (
                    <>
                      <Loader className="animate-spin" /> Creating{" "}
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Preview Section */}
        <div className="rounded-lg">
          <h2 className="text-xl mb-3 font-semibold">Preview</h2>
          <BookmarkCardPreview
            bookmark={formValues}
            collections={collections}
          />
        </div>
      </div>
    </div>
  );
}
