export interface NavigationItem  {
  title: string;
  url: string;
  isActive: boolean;
  subItems: { title: string; url: string }[];
};

export interface NavigationData  {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: NavigationItem[];
};