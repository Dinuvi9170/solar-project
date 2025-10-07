import {Wind,Sailboat,Triangle,Shield} from 'lucide-react';

const Herosection =()=>{
    return(
        <div className={"px-12 py-6"}>
            {/* second navbar */}
            <nav className={"flex justify-between"}>
                <div className={"gap-3 flex"}>
                    <div className={"w-9 h-9 rounded-full bg-[#7fff00]"}>
                        <Wind className="h-5 w-5 sm:mx-2 sm:my-2" />
                    </div>
                    <span className={"text-sm font-nomal font-[Inter] mt-2"}>Solar Energy</span>
                </div>

                <div className={"gap-3 flex"}>
                    <div className={"w-9 h-9 rounded-full bg-[#65a0da]"}>
                        <Sailboat color="#ffffff" className="h-5 w-5 sm:mx-2 sm:my-2"  />
                    </div>
                    <span className={"text-sm font-nomal font-[Inter] mt-2"}>Home Dashboard</span>
                </div>

                <div className={"gap-3 flex"}>
                    <div className={"w-9 h-9 rounded-full bg-[#7fff00]"}>
                        <Triangle fill="#000000" className="h-5 w-5 sm:mx-2 sm:my-2"  />
                    </div>
                    <span className={"text-sm font-nomal font-[Inter] mt-2"}>Real-Time Monitoring</span>
                </div>

                <div className={"gap-3 flex"}>
                    <div className={"w-9 h-9 rounded-full bg-[#65a0da]"}>
                        <Shield color="#ffffff" className="h-5 w-5 sm:mx-2 sm:my-2"  />
                    </div>
                    <span className={"text-sm font-nomal font-[Inter] mt-2"}>Anomaly Detection</span>
                </div>
            </nav>
            
            {/* hero section content */}
            <div className={"py-18 px-5 font-[Inter}"}>
                <span className={"text-[88px] font-bold leading-normal"}>Monitor Your Home's</span>
                <div className="flex">
                    <span className={"text-[88px] font-bold leading-normal"}>Sollar Energy</span>
                    <img src={"/images/wind turbines.jpg"} className="w-70 h-16 rounded-lg mx-5 mt-7"/>
                </div>
                <span className={"text-[88px] font-bold leading-normal"}>With Real-Time</span>
                <div className={"flex"}>
                    <span className={"text-[88px] font-bold leading-normal"}>Insights & Alerts</span>
                    <div className={"bg-[#65a0da] rounded-full w-12 h-12 mx-5 mt-9 flex justify-center items-center"}>
                        <Triangle fill="#ffffff" color="#ffffff"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Herosection;