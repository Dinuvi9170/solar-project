import { useState } from "react";
import { ChartAreaAxes } from "@/components/ui/areaChart/areaChart";
import { useGetEnergyRecordsBysolarIdQuery } from "@/lib/redux/query";
import { Funnel } from "lucide-react";

const EnergyChart =()=>{
    const {data:dailydata,isLoading, isError,error}= useGetEnergyRecordsBysolarIdQuery({id:"68ed36a4a3ecf49f08f986ea",groupBy:"date"})
    const {data:hourlydata}= useGetEnergyRecordsBysolarIdQuery({id:"68ed36a4a3ecf49f08f986ea",groupBy:"hour"})
    const [filterData,setfilterData]=useState(dailydata.slice(0,7));

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
            setfilterData( dailydata.slice(0,30));
        }else if(value==='week'){
            setfilterData(dailydata.slice(0,7));
        }else{
            const selectedDate = hourlydata?.[0]?._id?.date;
            const sameDayData = hourlydata?.filter(
            (el) => el._id?.date === selectedDate
            );
            setfilterData(sameDayData);
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