"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { buttonVariants } from "@/components/ui/button";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface PaginationTabsProps {
  totalPages: number;
  currentPage: number;
}

export default function PaginationTabs({
  totalPages,
  currentPage,
}: PaginationTabsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination className="my-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
            className={cn("border hover:bg-secondary/30 dark:hover:bg-muted", {
              "opacity-50 pointer-events-none cursor-not-allowed":
                currentPage === 1,
            })}
          />
        </PaginationItem>

        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={isActive}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(page);
                }}
                className={cn(
                  isActive
                    ? buttonVariants({
                        variant: "default",
                        className: "!bg-primary text-white hover:text-white",
                      })
                    : "border hover:bg-secondary/30 dark:hover:bg-muted"
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && goToPage(currentPage + 1)
            }
            className={cn("border hover:bg-secondary/30 dark:hover:bg-muted", {
              "opacity-50 pointer-events-none cursor-not-allowed":
                currentPage === totalPages,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
