import { Button } from "@/components/ui/button";
import { useGetAnomaliesBySolarUnitIdQuery, useGetSolarUnitforUserQuery } from "@/lib/redux/query";
import { useUser } from "@clerk/clerk-react";
import { ClockIcon, Loader2 } from "lucide-react";

const RecentAnomalies=()=>{
    const {user}=useUser();
    const {data: solarunit} = useGetSolarUnitforUserQuery(undefined, {skip: !user});
    const {data:anomalies,isLoading,isError,error}=useGetAnomaliesBySolarUnitIdQuery(
        {id:solarunit?._id,limit:3},{ skip: !solarunit?._id });
    
    if (isLoading) {
        return (
            <div className="w-full h-[200px] flex items-center justify-center bg-white">
                <div className="flex flex-col justify-center items-center">
                    <Loader2 className="w-6 h-6 animate-spin"/>
                    <span className="font-semibold text-xl text-gray-700">Loading...</span>
                </div>
            </div>
        )
    }
    if(!anomalies || anomalies.length === 0 ) return null;
    if(isError) {
        return (
            <div>Error: {error?.message}</div>
        )
    }
    
    return(
        <div className="w-full">
            {anomalies.map((anomaly)=>(
                <div key={anomaly._id} className="w-full border-t border-gray-200 h-auto px-4 py-2 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                    <div className="flex flex-col py-4 gap-2">
                        <div className="flex gap-2 items-center">
                            <span className="text-lg font-semibold text-gray-800">{anomaly.anomalyType} Anomaly</span>
                            <span 
                            className={`text-sm font-semibold px-2 py-1 rounded-full 
                                ${anomaly.severity === 'high' ? 'bg-red-200 text-red-800' : anomaly.severity ==='medium' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}
                            >{anomaly.severity}</span> 
                            <span 
                            className={`text-sm font-semibold px-2 py-1 rounded-full 
                                ${anomaly.resolved === 'active' ? 'bg-red-200 text-red-800' : anomaly.resolved ==='under review' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}
                            >{anomaly.resolved}</span>     
                        </div>
                        <div className="flex gap-1 items-center">
                            <ClockIcon className="w-4 h-4 text-gray-400"/>
                            <span className="text-sm text-gray-500">{new Date(anomaly.detection_time).toLocaleString()}</span>
                        </div>
                        <span className="text-md font-medium text-gray-600">{anomaly.description}</span>
                    </div>
                    <Button className={"bg-blue-500 hover:bg-blue-500/70"}>Investigate</Button>
                </div> 
            ))}
        </div>
    )
}
export default RecentAnomalies;