import { Outlet } from "react-router-dom";
import Navigation  from "../components/navigation/navbar";
import Footer from "../components/footer/footer";

const Layout =()=>{
    return(
        <>
            <Navigation/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout;