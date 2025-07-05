export interface NavigationItem  {
  title: string;
  url: string;
  isActive: boolean;
  subItems: { title: string; url: string }[];
};

export interface NavigationData  {
  navMain: NavigationItem[];
};