import { CheckCircle, Loader2 } from "lucide-react";
import EnergyConsumptionCard from "./components/energyConsumptionCard";
import { useGetEnergyRecordsBysolarIdQuery, useGetSolarUnitforUserQuery } from "@/lib/redux/query";
import { format, subDays } from "date-fns";
import WeatherData from "./components/weatherdata";
import EnergyChart from "./components/energyChart";
import { useUser } from "@clerk/clerk-react";

const DashboardPage =()=>{
    const {user}=useUser();
    
    const {data:solarunit}=useGetSolarUnitforUserQuery(undefined,{skip:!user});

    const {data,isLoading,isError,error}=useGetEnergyRecordsBysolarIdQuery(
        {id:solarunit?._id, groupBy:"date"},{ skip: !solarunit?._id });
    if(!solarunit?._id){
        return (
            <div className="w-full bg-gray-100 justify-center flex min-h-screen">
                <span className="text-xl mt-20 font-semibold text-blue-700">No solar unit found for this user.</span> 
            </div>
        )
    }
    if(isLoading){
        return(
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
                <Loader2 className="w-6 h-6 animate-spin"/>
                <span className="font-semibold mt-2 text-xl text-gray-700">Loading...</span>
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
    const sevendayago= subDays(new Date(lastrecord?.date),6);
    
    const weekData= Days.filter((day)=>{
        return day.date>=sevendayago
    })
    return(
        <div className="w-full min-h-screen bg-gray-100 overflow-y-auto">
            <div className="px-4 md:px-8 py-2 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div >
                        <h1 className="text-2xl font-bold">{user?.firstName}'s Home</h1>
                        <span className="text-base text-gray-500">Welcome back to your Solar Energy dashboard</span>
                    </div>
                    <div className="w-40 p-2 rounded-lg flex gap-2 items-center bg-green-100">
                        <CheckCircle color="green"/>
                        <span className="font-bold text-green-700">Status: {solarunit.status}</span>
                    </div>
                </div>
                <WeatherData/>
                <div className="w-full h-full bg-white rounded-lg px-5 py-3 mb-4">
                    <h1 className="text-lg font-bold">Last 7 Days Energy Consumption</h1>
                    <div className="grid grid-cols-2  md:grid-cols-7 gap-2 mt-4 justify-center items-center">
                        {weekData.map((el)=>(
                            <EnergyConsumptionCard 
                                key={el.date}
                                date={format(el.date,'dd MMM')}
                                consumption={el.totalDayEnergy}
                            />
                        ))}
                    </div>
                </div>
                <EnergyChart/>
            </div>
        </div>
    )
}

export default DashboardPage;