"use client";

import * as React from "react";
import {
  Bookmark,
  FolderKanban,
  Search,
  Clock,
  Settings,
  FolderPlus,
  Plus,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Bookmarks",
      url: "/bookmarks",
      icon: Bookmark,
      isActive: true,
      subItems: [
        { title: "All", url: "/bookmarks/all" },
        { title: "Favorites", url: "/bookmarks/favorites" },
      ],
    },
    {
      title: "Collections",
      url: "/collections",
      icon: FolderKanban,
      isActive: false,
      subItems: [],
    },

    {
      title: "Revisit Later",
      url: "/reminders",
      icon: Clock,
      isActive: false,
      subItems: [
        { title: "Today", url: "/reminders/today" },
        { title: "This Week", url: "/reminders/week" },
        { title: "Overdue", url: "/reminders/overdue" },
      ],
    },
  ],
  mails: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const { setOpen } = useSidebar();

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
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item);
                        setOpen(true);
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
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
                  <SidebarMenuButton
                    tooltip={{
                      children: "Add Bookmark",
                      hidden: false,
                    }}
                    className="px-2.5 md:px-2"
                  >
                    <Plus className="size-10 text-primary" strokeWidth={3} />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/* Content Sidebar */}
      <Sidebar
        collapsible="none"
        className="hidden bg-background flex-1 md:flex"
      >
        <SidebarHeader className="gap-3.5 border-b px-3 py-3">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem?.title}{" "}
              <span className="text-destructive">
                {" "}
                ({activeItem?.subItems?.length || 0})
              </span>
            </div>

            {activeItem.title === "Collections" && (
              <div className="flex items-center gap-2 text-primary">
                <Button variant="ghost" title="Create Subfolder">
                  <FolderPlus className="size-5" strokeWidth={2} size={18} />
                </Button>
              </div>
            )}
          </div>
          <SidebarInput
            placeholder={`Search ${activeItem?.title.toLowerCase()}...`}
            className="rounded-md h-10 border-primary mt-2"
          />
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
                      <a href={subItem.url}>{subItem.title}</a>
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
