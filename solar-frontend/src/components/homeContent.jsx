import {TriangleAlert, ChevronRight,Zap }  from 'lucide-react';

const HomeContent= ()=>{
    const details1=["Panel shading or dirt","Unexpected drop in output","Inverter errors","Missed maintainers reminders"];
    const details2=["Real-time energy tracking","Anomaly alerts","Historical performance reports","Remote diagnostics & support"];
    const goals=["Maximize solar energy savings.","Detect and resolve issues early.","Trac daily, weekly and monthly output.","Get notified of anomalies instantly."];
    const needs =["A simplydashboard for real-time monitoring.",
        "Instant alerts for system anomalies.",
        "Easy access to historical performance data.",
        "Clear,actionable insights forbetter energy management."];

    return(
        <div className="px-18 py-6 font-[Inter]">
            <div className="flex flex-col-2 items-left gap-x-16">            
                <img src={"/images/wind-turbine-2.jpg"} className="h-[700px] w-[600px] rounded-3xl border border-blue-100"/>
                <div className="mt-30 mr-33">
                    <span className="block text-5xl font-bold">Your Solar Energy </span>
                    <span className="block text-5xl font-bold leading-normal">Generation</span>
                    <p className="mt-10 leading-normal text-[17px]">This month, your solar panels generated <span className="text-blue-600">X kWh</span> of clean energy, helping you save on electricity bills and reduce
                         your carbon footprints. Track your energy production trends and see how much power you contribute back to the grid.</p>
                    <img src={"/images/turbines-building.jpeg"} className="mt-10 w-2/4 rounded-2xl"/>
                </div>
            </div>

            <div className="flex flex-col-2 items-left gap-x-16 mt-20">            
                <div className=" mr-24">
                    <div className='py-8 flex gap-3'>
                        <div className='bg-red-600 h-6 w-8 rounded-lg'>
                            <TriangleAlert color="#ffffff" width="16px" className='ml-[6px]' />
                        </div>
                        <span className='text-sm sm:mt-1 font-medium'>Problem</span>
                    </div>
                    <p className="text-[32px] font-bold">Home solar systems can face reduced efficiency and missed saving due to panel shading,
                        dirt, unexpected drops in output, or inverter issues. Stay ahead with instant anomaly alerts.
                    </p>      
                    <ul className='list-inside mt-10' >
                        {details1.map((el,i)=>(
                            <li key={i} className='flex py-3 gap-2'>
                                <ChevronRight color='red' className='w-5'/>
                                {el}
                            </li>
                        ))}
                    </ul>
                </div>
                <img src={"/images/turbines.jpg"} className="h-[600px] w-[600px] rounded-3xl border border-blue-100"/>
            </div>

            <div className="flex flex-col-2 items-left mt-10 gap-x-8">  
                <div className='relative w-8/4 font-bold text-white '>
                    <img src={"/images/white-turbine.jpg"} className="h-[700px] w-[600px] rounded-3xl border border-blue-100"/>
                    <div className='absolute w-18 h-10 px-3 py-2 border border-blue-600 bg-blue-600 rounded-lg bottom-6 left-6'>Aelora</div>
                </div>          
                <div className="px-10 border border-blue-600 bg-blue-400 rounded-3xl">
                    <div className='mt-10 flex gap-1 w-30  border border-lime-600 h-10 bg-lime-600 rounded-lg'>                        
                        <Zap className='ml-2 mt-2' />                        
                        <span className='mt-2 font-semibold'>Solution</span>
                    </div>
                    <p className="mt-10 leading-normal text-3xl mr-32 font-bold text-white">The Solar Home Dashboard empowers you to monitor your solar panels, receive
                        instant alertsfor anomalies, and optimize your energy usage for maximum savings and peace of mind.
                    </p>
                    <ul className='mt-10 list-inside'>
                        {details2.map((el,i)=>(
                            <li key={i} className='flex py-3 text-white gap-2'><ChevronRight color='green' />{el}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className=" flex flex-col-2 mt-20 ">            
                <div className="px-35">
                    <ul className='list-inside mt-10 ' >
                        <span className='font-bold text-xl'>Goals:</span>
                        {goals.map((el,i)=>(
                            <li key={i} className='flex py-2 gap-2'>
                                <ChevronRight color='red' className='w-5'/>
                                {el}
                            </li>
                        ))}
                    </ul>      
                    <ul className='list-inside mt-10' >
                        <span className='font-bold text-xl'>Needs:</span>
                        {needs.map((el,i)=>(
                            <li key={i} className='flex py-2 gap-2'>
                                <ChevronRight color='red' className='w-5'/>
                                {el}
                            </li>
                        ))}
                    </ul>
                    <div className='p-4 mt-15 flex flex-col-2 justify-between h-20 rounded-lg shadow-2xl '>
                        <div className='flex gap-1  '>
                            <img src={"/images/OIP.jpg"} className='w-10 h-10 rounded-full'/>
                            <span className='mt-3 text-sm font-bold'>Alex P.</span>
                            <span className='mt-4 text-xs text-gray-500'>42 y.o.</span>
                        </div>
                        <div className='flex gap-2 text-sm '>
                            <span className='mt-3 text-gray-500'>Homeowner</span>
                            <span className='mt-3 font-bold'>Solar User</span>
                        </div>
                    </div>
                </div>
                <img src={"/images/solar.jpg"} className="-mr-44 h-[650px] w-[600px] items-right rounded-3xl border border-blue-100 "/>
            </div>
        </div>
    )
}

export default HomeContent;