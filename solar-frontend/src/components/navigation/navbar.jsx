//import s from "./navbar.module.css";
import { Link } from "react-router-dom";
const Navigation =()=>{
    const user="JD";

    return (
        <nav className={"px-12 py-6 flex items-center justify-between "}>
            <Link to="/" className={"flex items-center gap-3"}>
                <div className={"bg-[#7fff00] rounded-full w-10 h-10"}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className={"px-[2px] mt-[6px] mr-[6px] mb-[6px] ml-[7px] items-center"}
                    >
                        <path d="M12.8 19.6A2 2 0 1 0 14 16H2"/>
                        <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/>
                        <path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>
                    </svg>
                </div>
                <span className={"text-lg font-semibold font-[Inter]"}>Aelora</span>
            </Link>
            <div className={"flex  gap-12"}>
                <Link to="/dashboard" className={"flex items-center px-3 py-2"}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className={"p-1 m-1 object-center"}
                    >
                        <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
                        <path d="M18 17V9"/><path d="M13 17V5"/>
                        <path d="M8 17v-3"/>
                    </svg>
                    <span className={"text-sm weight-medium font-[Inter]"}>Dashboard</span>
                </Link>
                <div className={"flex items-center px-3 py-2 gap-[10px]" }>
                    <div className={"bg-[#65a0da] rounded-full h-8 w-8"}>
                        <span className={"flex justify-center items-center mt-1 text-white"}>{user}</span>
                    </div>
                    <span className={"text-sm weight-medium font-[Inter]"}>John</span>
                </div>
            </div>
        </nav>
        
    );
};

export default Navigation;