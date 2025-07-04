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
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { createCollection } from "@/lib/actions/create-collection.action";
import { collectionSchema } from "@/validators/form";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof collectionSchema>;

export function CreateFolderModal({
  children,
}: Readonly<{ children: React.ReactNode }>) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: "",
    },
  });

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

      if (data?.success) {
        toast.success(data?.message);
        form.reset({});
          setOpen(false);
          router.refresh()
      }
    },
  });

  const onSubmit = (data: FormData) => {
    execute(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="z-[1000]">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="border-primary dark:border-border"
                      placeholder="Enter folder name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="text-base" disabled={isPending} type="submit">
              {isPending ? (
                <>
                  <Loader className="animate-spin" /> Creating{" "}
                </>
              ) : (
                "Create Folder"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
