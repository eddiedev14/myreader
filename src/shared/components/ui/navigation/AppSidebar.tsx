import { useAuth } from "@/features/auth/hooks/useAuth";
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
} from "@/shared/components/shadcn/sidebar";
import { Link } from "react-router-dom";
import { Button } from "../../shadcn/button";
import logo from "@/assets/logos/logo.svg";
import { useState } from "react";

type IItem = {
  title: string;
  url: string;
  icon: string;
};

// * Menu items
const items: IItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "ri-dashboard-fill",
  },
  {
    title: "Librería",
    url: "/library",
    icon: "ri-book-marked-fill",
  },
];

export function AppSidebar() {
  //* States
  const [imageError, setImageError] = useState(false);

  //* Context
  const { user, logout } = useAuth();

  return (
    <Sidebar className="bg-white border-r border-gray-200 shadow-sm">
      <SidebarHeader className="bg-white border-b border-gray-100 px-4 py-3">
        <img src={logo} alt="MyReader Logo" className="w-36" />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-gray-100 rounded-md px-2 py-2 transition"
                  >
                    <Link to={item.url}>
                      <i className={item.icon} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white border-t border-gray-100">
        <div className="w-full flex items-center justify-between px-2 py-2 gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            {user?.photoURL && !imageError ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover shrink-0"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm shrink-0">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <span className="text-sm font-medium truncate">
              {user?.username?.split(" ").slice(0, 2).join(" ") ?? "User"}
            </span>
          </div>

          <Button
            onClick={logout}
            className="size-10 rounded-full transition"
            variant="destructive"
          >
            <i className="ri-logout-box-r-line text-lg"></i>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
