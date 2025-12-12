import { useEffect, useState } from "react";
import { ChartAreaAxes } from "@/components/ui/areaChart/areaChart";
import { useGetEnergyRecordsBysolarIdQuery, useGetSolarUnitforUserQuery } from "@/lib/redux/query";
import { Funnel, Loader2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const EnergyChart =()=>{
    const { user } = useUser();
    const [limit,setlimit]=useState(7)

    const {data:solarunit}=useGetSolarUnitforUserQuery(undefined,{skip:!user});
    
    const {data:dailydata,isLoading, isError,error}= useGetEnergyRecordsBysolarIdQuery({
        id:solarunit?._id, groupBy:"date", limit:parseInt(limit)})
    const {data:hourlydata}= useGetEnergyRecordsBysolarIdQuery({id:solarunit?._id, groupBy:"hour"})
    const [filterData,setfilterData]=useState([]);
    
    useEffect(()=>{
        if(dailydata){
            setfilterData(dailydata.slice(0,limit))
        }
    },[dailydata,limit]);

    if(isLoading){
        return(
        <div className="w-full h-[300px] py-40 bg-white">
            <div className="flex flex-col px-150 justify-center items-center">
                <Loader2 className="w-6 h-6 animate-spin"/>
                <span className="font-semibold text-xl animation-pulse text-gray-700">Loading...</span>
            </div>
        </div>)
    }
    if(!dailydata || isError){
        return(
            <div>Error:{error.message}</div>
        )
    }
    
    const handleSelection=(e)=>{
        const value= e.target.value;
        if(value==='month'){
            setlimit(30);
            setfilterData(dailydata?.slice(0, 30));
        }else if(value==='week'){
            setlimit(7);
            setfilterData(dailydata?.slice(0, 7));
        }else{
            setfilterData(hourlydata);
        }
    }

    return(
        <div className="bg-white rounded-xl px-5 mb-4 py-3 flex flex-col justify-center">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold">Power Usage Chart</h1>
                <div className="px-10 flex items-center gap-4 text-sm">
                    <Funnel color='gray' className="w-4 h-4" />
                    <select onChange={handleSelection} defaultValue="week" className="p-2 border-2 border-blue-500 rounded-md">
                        <option value="day">Per Day</option>
                        <option value="week">Per Week</option>
                        <option value='month'>Per Month</option>
                    </select>
                </div>
            </div>
            <ChartAreaAxes data={filterData} className={'-px-3'}/>
        </div>
    )
}
export default EnergyChart;