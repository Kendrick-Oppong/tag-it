"use client";

import * as React from "react";
import {
  Bookmark,
  FolderKanban,
  BrainCircuit,
  Search,
  Tags,
  Clock,
  Settings,
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
        { title: "Favorites", url: "/bookmarks/favorites" },
        { title: "Uncategorized", url: "/bookmarks/uncategorized" },
        { title: "Recently Added", url: "/bookmarks/recent" },
        { title: "Archived", url: "/bookmarks/archived" },
      ],
    },
    {
      title: "Collections",
      url: "/collections",
      icon: FolderKanban,
      isActive: false,
      subItems: [
        { title: "Personal Collections", url: "/collections/personal" },
        { title: "Team Collections", url: "/collections/team" },
        { title: "Public Collections", url: "/collections/public" },
      ],
    },
    {
      title: "Suggestions",
      url: "/suggestions",
      icon: BrainCircuit,
      isActive: false,
      subItems: [
        { title: "Tag-Based", url: "/suggestions/tags" },
        { title: "Trending Links", url: "/suggestions/trending" },
        { title: "Related Content", url: "/suggestions/related" },
      ],
    },
    {
      title: "Search",
      url: "/search",
      icon: Search,
      isActive: false,
      subItems: [
        { title: "Recent Searches", url: "/search/recent" },
        { title: "Pinned Results", url: "/search/pinned" },
        { title: "Advanced Filters", url: "/search/filters" },
      ],
    },
    {
      title: "Tags",
      url: "/tags",
      icon: Tags,
      isActive: false,
      subItems: [
        { title: "Auto-Tagged", url: "/tags/auto" },
        { title: "Custom Tags", url: "/tags/custom" },
        { title: "Most Used", url: "/tags/popular" },
      ],
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
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      isActive: false,
      subItems: [
        { title: "Account", url: "/settings/account" },
        { title: "Appearance", url: "/settings/appearance" },
        { title: "Import/Export", url: "/settings/import-export" },
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
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
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
        <SidebarHeader className="gap-3.5 border-b px-4 py-3">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem?.title}
            </div>
            <div className="flex items-center gap-2">
              <p className="text-primary font-medium text-base">
                Total ({activeItem?.subItems?.length || 0})
              </p>
              <Button
                variant="default"
                className="p-1 rounded-full"
                title="Create Subfolder"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          <SidebarInput
            placeholder={`Search ${activeItem?.title.toLowerCase()}...`}
            className="rounded-sm border border-primary mt-2"
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
                      className="hover:text-primary hover:bg-muted/10 hover:dark:bg-muted rounded-md py-2"
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
