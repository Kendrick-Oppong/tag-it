"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import BookmarkCardPreview from "@/components/shared/card/preview";
import { bookmarkSchema } from "@/validators/form";
import { useFetchBookmarkMetadata } from "@/hooks/useFetchBookmarkMetadata";
import { Asterisk } from "lucide-react";

export default function CreateBookmark() {
  const form = useForm({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      title: "",
      url: "",
      description: "",
      isFavorite: false,
      revisitAt: null,
      faviconUrl: "",
      thumbnailUrl: "",
      metadata: "",
      collectionId: null,
    },
  });

  const url = form.watch("url");
  const formValues = form.watch();
  useFetchBookmarkMetadata(url, form);

  function onSubmit(values: z.infer<typeof bookmarkSchema>) {
    console.log("Bookmark form data:", values);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl text-center font-bold mb-8">
        Create a New Bookmark
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border border-border p-2 rounded-lg ">
        {/* Form Section */}
        <div className="p-6 rounded-lg border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                name="thumbnailUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail URL (auto-fetched)</FormLabel>
                    <FormControl>
                      <Input
                        className="cursor-not-allowed"
                        type="url"
                        placeholder="Thumbnail will be auto-fetched"
                        {...field}
                        readOnly
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
          <BookmarkCardPreview bookmark={formValues} />
        </div>
      </div>
    </div>
  );
}
