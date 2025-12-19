import { useGetAnomalyCountByTypeQuery, useGetSolarUnitforUserQuery } from "@/lib/redux/query";
import { useUser } from "@clerk/clerk-react";
import { ChartPieLabel } from "./pieChart";
import { Loader2 } from "lucide-react";

const TypesData= ()=>{
    const {user}=useUser();
    const {data: solarunit} = useGetSolarUnitforUserQuery(undefined, {skip: !user});
    const {data: anomalyTypes, isLoading, isError, error} = useGetAnomalyCountByTypeQuery(
        {id: solarunit?._id}, { skip: !solarunit?._id })

    if (isLoading) {
        return (
            <div className="w-full h-[300px] py-40 bg-white">
                <div className="flex flex-col px-150 justify-center items-center">
                    <Loader2 className="w-6 h-6 animate-spin"/>
                    <span className="font-semibold text-xl animation-pulse text-gray-700">Loading...</span>
                </div>
            </div>
        )
    }
    if(!anomalyTypes || anomalyTypes.length === 0 ) return null;
    if(isError) {
        return (
            <div>Error: {error?.message}</div>
        )
    }
    const perType = anomalyTypes.map((type)=>({
        anomalyType: type.anomalyType,
        count: type.count,
    }))
    return (
        <ChartPieLabel data={perType}/>
    )
}
export default TypesData;