import { Zap, Wind, Settings, ChevronUp, Receipt } from "lucide-react"

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
import { Link, useLocation } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useUser } from "@clerk/clerk-react"

// Menu items.
const items = [
  {
    title: "Solar Units",
    url: "/admin/solarunits",
    icon: Zap,
    name:"solarunits"
  },
  {
    title: "Invoices",
    url: "/admin/invoices",
    icon: Receipt,
    name:"invoices"
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
    name:"setting"
  },
  
]

export function AdminSidebar() {
  const location =useLocation()
  const path= location.pathname;
  const {user}=useUser();

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