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
import { Asterisk } from "lucide-react";
import { z } from "zod";
import { createBookmark } from "@/lib/actions/create-bookmark.action";
import { useAction } from "next-safe-action/hooks";
import { Collection } from "@prisma/client";

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

  const { execute, result } = useAction(createBookmark, {
    onError: ({ error }) => {
      if (error.validationErrors) {
        console.error("Validation errors:", error.validationErrors);
      }
      if (error.serverError) {
        console.error("Server error:", error.serverError);
      }

      console.error("Error creating bookmark:", error);
    },

    onSuccess: (data) => {
      console.log("Bookmark created successfully:", data);
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
                      <Input placeholder="Enter bookmark title" {...field} />
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
                        type="url"
                        placeholder="https://example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="collectionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collection Type</FormLabel>
                    <FormControl>
                      <Select
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
                          {collections.length > 0 &&
                            collections.map((collection) => (
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (auto-fetched)</FormLabel>
                    <FormControl>
                      <Textarea
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
                <Button variant="destructive" onClick={() => form.reset()}>
                  Clear
                </Button>
                <Button type="submit">Create</Button>
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
