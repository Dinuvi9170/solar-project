import { Loader2, Thermometer, Wind, Zap } from "lucide-react";
import EnergyConsumptionCard from "./components/energyConsumptionCard";
import { useGetEnergyRecordsBysolarIdQuery } from "@/lib/redux/query";
import { format, subDays } from "date-fns";

const DashboardPage =()=>{
    const {data,isLoading,isError,error}=useGetEnergyRecordsBysolarIdQuery({id:"68ed36a4a3ecf49f08f986ea", groupBy:"date"});

    if(isLoading){
        return(
        <div className="w-full h-[300px} py-20">
            <div className="flex flex-col px-150 justify-center items-center">
                <Loader2 className="w-6 h-6 animate-spin"/>
                <span className="font-semibold text-xl animation-pulse text-gray-700">Loading...</span>
            </div>
        </div>)
    }
    if(!data || isError){
        return(
            <div>Error:{error.message}</div>
        )
    }
    const Days= data.map((el)=>({
        ...el,
        date: new Date(el._id.date)    
    }))
    const lastrecord= Days[0];
    const sevendayago= subDays(new Date(lastrecord.date),6);
    
    const weekData= Days.filter((day)=>{
        return day.date>=sevendayago
    })
    return(
        <div className="w-full h-full bg-gray-100 overflow-y-scroll">
            <div className="px-8 py-2 flex flex-col">
                <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Alexander's Home</h1>
                        <span className="text-base text-gray-500">Welcome back to your Solar Energy dashboard</span>
                    </div>
                    <div className="flex">
                        <span>Status</span>
                    </div>
                </div>
                <div className="flex w-full h-[300px] my-4 gap-6 justify-center">
                    <div className="flex flex-col w-1/2 h-full rounded-xl items-center bg-[url('/images/solarpanels.jpg')] bg-cover bg-center">
                        <div className="mt-[20px] w-[500px] rounded-xl flex px-3 items-center h-[50px] bg-[#00000060]">
                            <span className="text-white font-bold text-lg">Weather Conditions</span>
                        </div>
                        <div className="mt-[20px] w-[500px] flex gap-4  h-[80px]">
                            <div className="w-1/2 h-full bg-[#00000060] flex rounded-xl">
                                <div className="flex px-5 items-center ">
                                    <div className="flex bg-[#ffffff60] items-center justify-center p-1 w-10 h-10 rounded-md ">
                                        <Thermometer color='white' className="w-5 h-5"/>
                                    </div>
                                    <div className="flex flex-col px-2 text-white">
                                        <span className="font-bold text-lg leading-tight">12 °C</span>
                                        <span className="text-xs font-bold">Temperature</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 h-full flex bg-[#00000060] rounded-xl">
                                <div className="flex px-5 items-center ">
                                    <div className="flex bg-[#ffffff60] items-center justify-center p-1 w-10 h-10 rounded-md ">
                                        <Wind color='white' className="w-5 h-5"/>
                                    </div>
                                    <div className="flex flex-col px-2 text-white">
                                        <span className="font-bold text-lg leading-tight">8.5 m/s</span>
                                        <span className="text-xs font-bold">Wind Speed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 h-full justify-center flex bg-blue-400 rounded-xl ">
                        <div className="px-6 py-5 flex flex-col">
                            <div className="flex text-white items-center font-bold">
                                <Zap className="w-4 h-4 mr-2"/>
                                <span className="text-lg ">Real-Time Power</span>
                            </div>
                            <div className="flex w-[500px] justify-between text-sm font-bold text-white">
                                <div className="flex flex-col gap-2">
                                    <span>Avg Wind Speed(10min)</span>
                                    <span>Avg Power(10min)</span>
                                    <span>Peak Power(10min)</span>
                                    <span>Total Energy</span>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span>7.8 m/s</span>
                                    <span>280.4 kW</span>
                                    <span>332.1 kW</span>
                                    <span>4.0 GWh</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[150px] bg-white rounded-lg px-5 py-3">
                    <h1 className="text-lg font-bold">Last 7 Days Energy Consumption</h1>
                    <div className="grid grid-cols-7 gap-2 mt-4 justify-center items-center">
                        {weekData.map((el)=>(
                            <EnergyConsumptionCard 
                                key={el.date}
                                date={format(el.date,'dd MMM')}
                                consumption={el.totalDayEnergy}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;