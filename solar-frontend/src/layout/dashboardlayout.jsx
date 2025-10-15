import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sideBar/sidebar"; 
const DashboardLayout =()=>{
    return(
        <>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                    <Outlet/>
                </main>
            </SidebarProvider>
        </>
    )
}
export default DashboardLayout;