import { AppSidebar } from "@/components/app-sidebar";
import HeaderComponent from "@/components/dashboard/Header.component";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BreadcrumbComponent } from "@/components/shared/breadcrumb/breadcrumb.component";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${bai_Jamjuree.className}`}>
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
            <section className="mt-36 flex flex-1 flex-col gap-4 p-3">
              {children}
            </section>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
