import { AppSidebar } from "@/components/app-sidebar";
import HeaderComponent from "@/components/dashboard/Header.component";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bai_Jamjuree } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme/theme-provider";

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
      <body className={`text-lg ${bai_Jamjuree.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderComponent />
          <SidebarProvider className="w-auto">
            <AppSidebar />
            <SidebarInset>
              <header className="bg-background mt-14 w-full fixed top-0 flex shrink-0 items-center gap-2 border-b p-4">
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
                  {/* <div>
                    <Button className="w-fit">Add Bookmark</Button>
                  </div> */}
                </Breadcrumb>
              </header>
              <section className="mt-16 flex flex-1 flex-col gap-4 p-4">
                {children}
                {Array.from({ length: 24 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
                  />
                ))}
              </section>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
