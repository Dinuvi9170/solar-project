import { useUser } from "@clerk/clerk-react";
import { Outlet, Navigate } from "react-router-dom";

const Authorizedlayout=()=>{
    const {user}=useUser();
    if(user?.publicMetadata.role!== "admin"){
        return <Navigate to="/"/>
    }
    return <Outlet/>

}

export default Authorizedlayout;