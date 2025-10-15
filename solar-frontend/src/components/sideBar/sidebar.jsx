import { LayoutDashboard,TriangleAlert,ChartLine,UsersRound, Wind } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Anomaly",
    url: "/dashboard/anomaly",
    icon: TriangleAlert,
  },
  {
    title: "Analytics",
    url: "/dashboard/analitics",
    icon: ChartLine ,
  },
  {
    title: "Users",
    url: "#",
    icon: UsersRound,
  },
  
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="font-[Inter]">
          <SidebarGroupLabel>
            <Link to="/" className="flex gap-2 items-center">
                <div className="flex justify-center items-center w-10 h-10 border rounded-full border-2 border-black bg-[#7fff00]">
                    <Wind color="black" className="w-5 h-5"/>
                </div>
                <span className="text-xl font-bold text-black">Aelora</span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="py-5 flex">
            <SidebarMenu className="px-1 flex">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="flex">
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="w-8 h-8" size={50}/>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}