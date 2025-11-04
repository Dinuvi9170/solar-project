import { ChartAreaAxes } from "@/components/ui/areaChart/areaChart";
import { useGetEnergyRecordsBysolarIdQuery } from "@/lib/redux/query";
const EnergyChart =()=>{
    const {data,isLoading, isError,error}= useGetEnergyRecordsBysolarIdQuery({id:"68ed36a4a3ecf49f08f986ea",groupBy:"date"})

    if(isLoading){
        return(
        <div className="w-full h-[300px] py-40 bg-white">
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
    const last30Days= data.slice(0,30);

    return(
        <div className="bg-white rounded-xl px-5 mb-4 py-3 flex flex-col justify-center">
            <div className="flex justify-between">
                <h1 className="text-lg font-bold">Power Usage Chart</h1>
            </div>
            <ChartAreaAxes data={last30Days} className={'-px-3'}/>
        </div>
    )
}
export default EnergyChart;