import { useGetAnomalyResolveStatusQuery, useGetSolarUnitforUserQuery } from "@/lib/redux/query";
import { useUser } from "@clerk/clerk-react";
import { Loader2, TriangleAlert, Clock, CheckCircle } from "lucide-react";

const ResolvedStatus =()=>{
    const {user} = useUser();
    const {data:solarunit}= useGetSolarUnitforUserQuery(undefined,{skip:!user});
    const {data:resolvedStatus,isLoading,isError,error}= useGetAnomalyResolveStatusQuery(
        {id:solarunit?._id},{skip:!solarunit?._id});
    
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
    if(!resolvedStatus ) return null;
    if (isError) {
        return (
            <div>Error: {error?.message}</div>
        )
    }
    const capitalizeWords = (text) =>text.replace(/\b\w/g, (char) => char.toUpperCase());

    const items={
        active:TriangleAlert,
        "under review":Clock,
        resolved:CheckCircle
    }
    
    return(
        <div className="w-full py-4">
            <div className="grid grid-cols-3 gap-4">
                {resolvedStatus.map((status,index)=>{
                    const Icon = items[status.status];
                    return(
                    <div key={index} 
                    className="border border-gray-300 rounded-lg p-4 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <h2 className="text-md text-gray-700 font-semibold mb-2">
                                    {capitalizeWords(status.status==="under review"?status.status:`${status.status} Anomalies`)}</h2>
                                <p className="text-gray-500">{status.count}</p>
                            </div>
                            <div className="flex ">
                                <div className={`h-12 w-12 rounded-lg items-center justify-center flex
                                    ${status.status==="active"?"bg-red-50":status.status==="under review"?"bg-yellow-50":"bg-green-50"}`}>
                                    {Icon && 
                                        <Icon 
                                            className={`w-6 h-6 
                                            ${status.status === "active"? "text-red-600"
                                            : status.status === "under review"? "text-yellow-600": "text-green-600"}`}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                )})}
                
            </div>
        </div>
    )
}
export default ResolvedStatus;