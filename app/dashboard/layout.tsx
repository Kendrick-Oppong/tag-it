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
import { Bai_Jamjuree } from "next/font/google";

const bai_Jamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={`text-lg ${bai_Jamjuree.className} antialiased`} >
        <SidebarProvider
          className=""
          style={
            {
              "--sidebar-width": "300px",
            } as React.CSSProperties
          }
        >
          <div className="">
            <AppSidebar />
          </div>

          <SidebarInset>
            <header className="sticky top-0 flex shrink-0 items-center justify-between gap-2 border-b px-3 py-2">
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
                  Add Bookmark
                </Button>
              </div>
            </header>
            <div>
          
                3rd side bar content
                {children}
        
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
