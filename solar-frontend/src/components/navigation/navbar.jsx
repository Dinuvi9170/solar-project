//import s from "./navbar.module.css";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
const Navigation =()=>{
    const { user } = useUser();
    return (
        <nav className={"px-4 md:px-12 py-4 md:py-6 flex items-center justify-between "}>
            <Link to="/" className={"flex items-center gap-3"}>
                <div className={"bg-[#7fff00] rounded-full w-10 h-10 flex items-center justify-center"}>
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
            <div className={"flex gap-0  md:gap-5"}>
                <SignedIn >
                    <Link to="/dashboard" className={"flex items-center px-3 py-2 gap-1 hover:bg-gray-100 rounded-md"}>
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
                    {user?.publicMetadata?.role === "admin" && (
                        <Link
                        to="/admin"
                        className="flex items-center md:px-3 py-2 md:gap-1 hover:text-red-600 font-semibold"
                        >
                        Admin
                        </Link>
                    )}
                </SignedIn>
                <div className={"flex items-center px-3 py-2 gap-[10px]" }>
                    <SignedOut>
                        <Button asChild>
                            <Link to='/sign-in'>Sign In</Link>
                        </Button>
                    </SignedOut> 
                    <SignedIn>
                        <UserButton
                            appearance={{
                            elements: {
                                avatarBox: "w-10 h-10 border-2 border-blue-500 rounded-full",
                            },
                            }}
                        />    
                    </SignedIn>
                </div>
            </div>
        </nav>
        
    );
};

export default Navigation;