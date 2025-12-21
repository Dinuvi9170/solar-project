import {Wind,Sailboat,Triangle,Shield} from 'lucide-react';

const Herosection =()=>{
    return(
        <div className={"px-4 md:px-12 py-6"}>
            {/* second navbar */}
            <nav className={"flex flex-wrap gap-4 md:0 justify-between"}>
                <div className={"gap-3 items-center flex"}>
                    <div className={"w-9 h-9 rounded-full bg-[#7fff00] flex items-center justify-center"}>
                        <Wind className="h-5 w-5 " />
                    </div>
                    <span className={"text-sm font-normal font-[Inter]"}>Solar Energy</span>
                </div>

                <div className={"gap-3 items-center flex"}>
                    <div className={"w-9 h-9 rounded-full bg-[#65a0da] flex items-center justify-center"}>
                        <Sailboat color="#ffffff" className="h-5 w-5 "  />
                    </div>
                    <span className={"text-sm font-nomal font-[Inter]"}>Home Dashboard</span>
                </div>

                <div className={"gap-3 items-center flex"}>
                    <div className={"w-9 h-9 rounded-full bg-[#7fff00] flex items-center justify-center"}>
                        <Triangle fill="#000000" className="h-5 w-5 "  />
                    </div>
                    <span className={"text-sm font-nomal font-[Inter]"}>Real-Time Monitoring</span>
                </div>

                <div className={"gap-3 items-center flex"}>
                    <div className={"w-9 h-9 rounded-full bg-[#65a0da] flex items-center justify-center"}>
                        <Shield color="#ffffff" className="h-5 w-5"  />
                    </div>
                    <span className={"text-sm font-nomal font-[Inter]"}>Anomaly Detection</span>
                </div>
            </nav>
            
            {/* hero section content */}
            <div className={"py-10 px-2 md:py-18 md:px-5 font-[Inter}"}>
                <span className={"text-3xl md:text-[88px] font-bold leading-normal"}>Monitor Your Home's</span>
                <div className="flex flex-col md:flex-row ">
                    <span className={"text-3xl md:text-[88px] font-bold leading-normal"}>Sollar Energy</span>
                    <img src={"/images/wind turbines.jpg"} className="w-full object-cover md:w-70 h-16 rounded-lg md:mx-5 md:mt-7"/>
                </div>
                <span className={"text-3xl md:text-[88px] font-bold block leading-normal"}>With Real-Time</span>
                <div className={"flex"}>
                    <span className={"text-3xl md:text-[88px] font-bold leading-normal"}>Insights & Alerts</span>
                    <div className={"bg-[#65a0da] rounded-full w-6 h-6  md:w-12 md:h-12 mx-2 md:mx-5 md:mt-9 flex justify-center items-center"}>
                        <Triangle fill="#ffffff" className='w-3 h-3 md:w-8 md:h-8' color="#ffffff"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Herosection;