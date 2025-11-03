import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sideBar/sidebar"; 
const DashboardLayout =()=>{
    return(
        <>
            <SidebarProvider>
                <AppSidebar/>
                <main  className="bg-gray-100 w-full h-full" >
                    <SidebarTrigger/>
                    <Outlet/>
                </main>
            </SidebarProvider>
        </>
    )
}
export default DashboardLayout;