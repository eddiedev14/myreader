import { useAuth } from "@/features/auth/hooks/useAuth";
import Avatar, { genConfig } from "react-nice-avatar";
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

// * Menu items
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "ri-dashboard-fill",
  },
];

export function AppSidebar() {
  //* Context
  const { user, logout } = useAuth();

  // Generate config for user avatar based on his email
  const avatarConfig = genConfig(user?.email);

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
            <Avatar className="w-8 h-8 rounded-full object-cover" {...avatarConfig} />
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
