"use client";

import { useState } from "react";
import { Search, FolderPlus, Bookmark, FolderKanban, Plus } from "lucide-react";

import { NavUser } from "@/components/shared/sidebar/nav-user";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NavigationData } from "@/interfaces/data.interfaces";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  navigationData: NavigationData;
};

// Map titles to icons
const iconMap: Record<string, React.ElementType> = {
  Bookmarks: Bookmark,
  Collections: FolderKanban,
  "New Bookmark": Plus,
};

export function AppSidebar({ navigationData, ...props }: AppSidebarProps) {
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
                            item.subItems[0]?.title === "Create" ? 3 : ""
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
          <NavUser user={navigationData.user} />
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

            {activeItem.title === "Collections" && (
              <div className="flex items-center gap-2 text-primary">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost">
                        <FolderPlus
                          className="size-5"
                          strokeWidth={2}
                          size={18}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">Create Folder</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent className="px-3">
              <SidebarMenu>
                {activeItem?.subItems?.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
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
                        {subItem.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
