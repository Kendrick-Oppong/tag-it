"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumb } from "@/hooks/use-Breadcrumb";

export function BreadcrumbComponent() {
  const { category, subcategory, capitalize } = useBreadcrumb();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {category ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/dashboard/${category}`}>
                {capitalize(category)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {subcategory && <BreadcrumbSeparator className="hidden md:block" />}
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        )}
        {subcategory && (
          <BreadcrumbItem>
            <BreadcrumbPage>{capitalize(subcategory)}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
