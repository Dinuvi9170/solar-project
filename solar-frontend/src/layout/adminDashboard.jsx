import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/pages/admin/components/sidebar";

const AdminLayout = () => {
  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <main className="bg-gray-100 w-full h-screen overflow-y-scroll">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
};

export default AdminLayout;
