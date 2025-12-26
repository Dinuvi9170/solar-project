import { LayoutDashboard,TriangleAlert, Wind, ChevronUp, Receipt, Zap } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useClerk, useUser } from "@clerk/clerk-react";

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
    title: "Invoices",
    url: "/dashboard/invoices",
    icon: Receipt ,
    name:"Invoices"
  },
]

export function AppSidebar() {
  const location =useLocation()
  const path= location.pathname;

  const { user, isSignedIn } = useUser();
  const clerk= useClerk();
  const navigate= useNavigate();

  if (!isSignedIn || !user) return null;

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
                    <Zap color="black" className="w-5 h-5"/>
                </div>
                <span className="text-xl font-bold text-black">Solarix</span>
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
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="flex items-center justify-between">
                    <span>{user.firstName}  {user.lastName}</span>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => clerk.signOut()}>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}