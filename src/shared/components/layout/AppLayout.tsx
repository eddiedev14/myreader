import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/shadcn/sidebar";
import { AppSidebar } from "../ui/navigation/AppSidebar";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-4">
        <SidebarTrigger className="cursor-pointer" />
        <div className="pt-2 flex flex-col gap-6">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};
