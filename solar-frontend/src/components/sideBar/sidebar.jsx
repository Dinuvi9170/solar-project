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
import { Link, useLocation } from "react-router-dom"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    name:"dashboard",
  },
  {
    title: "Anomaly",
    url: "/dashboard/anomaly",
    icon: TriangleAlert,
    name:"anomaly"
  },
  {
    title: "Analytics",
    url: "/dashboard/analitics",
    icon: ChartLine ,
    name:"analytics"
  },
  {
    title: "Users",
    url: "#",
    icon: UsersRound,
    name:"users"
  },
  
]

export function AppSidebar() {
  const location =useLocation()
  const path= location.pathname;

  const Setclass=(url)=>{
      if(path===url){
        return "bg-blue-100"
      }else{
        return "bg-white"
      }
  }
  return (
    <Sidebar>
      <SidebarContent className='bg-white drop-shadow-xl'>
        <SidebarGroup className="font-[Inter] px-3 py-5 ">
          <SidebarGroupLabel>
            <Link to="/" className="flex gap-2 items-center">
                <div className="flex justify-center items-center w-8 h-8 rounded-full bg-[#7fff00]">
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
                    <Link to={item.url} className={`${Setclass(item.url)}`}>
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