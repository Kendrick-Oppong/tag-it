import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import HeaderComponent from "@/components/dashboard/Header.component";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BreadcrumbComponent } from "@/components/shared/breadcrumb/breadcrumb.component";

import { saveUser } from "@/lib/actions/create-user.action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { fetchUserData } from "@/lib/api";
import { getNavigationData } from "@/constants/dashboard.constants";
import StoreProvider from "../../StoreProvider";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  await saveUser();

  const { collections } = await fetchUserData();
  const navigationData = getNavigationData(collections ?? []);

  return (
    <StoreProvider>
      <HeaderComponent />
      <SidebarProvider className="w-auto">
        <AppSidebar navigationData={navigationData} />
        <SidebarInset>
          <header className="bg-background z-2 mt-16 w-full fixed top-0 flex shrink-0 items-center gap-2 border-b p-2.5">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <BreadcrumbComponent />
          </header>
          <section className="mt-24 flex flex-1 flex-col gap-4 py-3 px-5">
            {children}
          </section>
        </SidebarInset>
      </SidebarProvider>
    </StoreProvider>
  );
}
