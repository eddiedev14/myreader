import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/shadcn/sidebar";
import { type ReactNode } from "react";

import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";

interface PageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const AppLayout = ({
  title,
  description,
  children,
}: PageLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-4">
        <SidebarTrigger className="cursor-pointer" />

        <div className="pt-2 flex flex-col gap-6">
          <Header title={title} paragraph={description} />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};
