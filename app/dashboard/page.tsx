import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="relative w-full">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "300px",
          } as React.CSSProperties
        }
      >
        <div>
          <AppSidebar />
        </div>
        <SidebarInset>
          <header className="sticky top-0 flex shrink-0 items-center justify-between gap-2  border-b px-3 py-2">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Inbox</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div>
              <Button className="font-medium text-base gap-0">
                <Plus strokeWidth={2} className="size-5"/> Bookmark
              </Button>
            </div>
          </header>
          <div className="">
            3rd side bar content
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
