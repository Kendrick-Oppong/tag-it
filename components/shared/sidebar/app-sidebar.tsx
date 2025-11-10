"use client";

import { Fragment, useState } from "react";
import { Search, Bookmark, FolderKanban, Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NavigationData } from "@/interfaces/data.interfaces";
import { Collection } from "@prisma/client";

import { NavUser } from "./nav-user";
import { CreateFolderModal } from "../forms/CreateModal";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  navigationData: NavigationData;
  collections?: Collection[];
};

// Map titles to icons
const iconMap: Record<string, React.ElementType> = {
  Bookmarks: Bookmark,
  "New Bookmark": Plus,
};

export function AppSidebar({ navigationData, collections, ...props }: AppSidebarProps) {
  const [activeItem, setActiveItem] = useState(navigationData.navMain[0]);
  const router = useRouter();
  const { setOpen } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="fixed mt-16 overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* Icon Sidebar */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarContent className="bg-background">
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu className="space-y-3">
                {navigationData.navMain.map((item) => {
                  const Icon = iconMap[item.title] || Bookmark; // Fallback to Bookmark if no match
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => {
                          setActiveItem(item);
                          setOpen(true);
                          if (item.subItems.length > 0) {
                            router.push(item.subItems[0].url);
                          }
                        }}
                        isActive={activeItem?.title === item.title}
                        className={`px-2.5 md:px-2 `}
                      >
                        <Icon
                          strokeWidth={`${
                            item.subItems[0]?.title === "Create" ? 3 : 2
                          }`}
                          className={`${
                            item.subItems[0]?.title === "Create"
                              ? "text-primary font-bold"
                              : ""
                          }`}
                        />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={{
                      children: "Create Folder",
                      hidden: false,
                    }}
                    className="px-2.5 md:px-2 mb-2"
                  >
                    <CreateFolderModal collections={collections}>
                      <FolderKanban className="size-10" />
                    </CreateFolderModal>
                  </SidebarMenuButton>
                  <SidebarMenuButton
                    tooltip={{
                      children: "Global Search",
                      hidden: false,
                    }}
                    className="px-2.5 md:px-2 mb-2"
                  >
                    <Search className="size-10" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser  />
        </SidebarFooter>
      </Sidebar>

      {/* Content Sidebar */}
      <Sidebar
        collapsible="none"
        className="hidden bg-background flex-1 md:flex"
      >
        <SidebarHeader className="gap-3.5 border-b px-3 py-3">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium">{activeItem?.title}</div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent className="px-3">
              <SidebarMenu>
                {activeItem?.subItems?.map((subItem) => {
                  const isAll = subItem.title === "All";

                  return (
                    <Fragment key={subItem.title}>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className="hover:text-primary hover:bg-secondary/30 dark:hover:bg-muted rounded-md py-2"
                        >
                          <Link
                            className={
                              pathname === subItem.url
                                ? "bg-accent font-medium"
                                : ""
                            }
                            href={subItem.url}
                          >
                            
                              <FolderKanban className="text-orange-500" />
                            
                            {subItem.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      {isAll && (
                        <div className="my-2 h-px w-full bg-border dark:bg-muted/30" />
                      )}
                    </Fragment>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
