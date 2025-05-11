import { AppSidebar } from "@/components/app-sidebar";
import HeaderComponent from "@/components/dashboard/Header.component";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BreadcrumbComponent } from "@/components/shared/breadcrumb/breadcrumb.component";

import FilteringComponent from "@/components/shared/filter/filtering.component";
import { saveUser } from "@/lib/create-user.action";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await saveUser();
  return (
    <>
      <HeaderComponent />
      <SidebarProvider className="w-auto">
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background z-2 mt-16 w-full fixed top-0 flex shrink-0 items-center gap-2 border-b p-2.5">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <BreadcrumbComponent />
          </header>
          <section className="mt-16 flex flex-1 flex-col gap-4 py-3 px-5">
            <FilteringComponent />
            {children}
          </section>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
