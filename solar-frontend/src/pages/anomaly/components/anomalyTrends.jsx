import { useGetAnomaliesBySolarUnitIdQuery, useGetSolarUnitforUserQuery } from "@/lib/redux/query";
import { ChartLineLabel } from "./trendsChart";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const AnomalyTrends = () => {
    const {user} = useUser();
    const [limit, setLimit] = useState(7);
    const [groupBy, setGroupBy] = useState("daily");
    const [filterData, setFilterData] = useState([]);

    const {data: solarunit} = useGetSolarUnitforUserQuery(undefined, {skip: !user});
    const {data: anomalies, isLoading, isError, error} = useGetAnomaliesBySolarUnitIdQuery(
        {id: solarunit?._id, groupBy, limit: parseInt(limit)},{ skip: !solarunit?._id })

    useEffect(() => {
        if (anomalies) {
            setFilterData(anomalies.slice(0, limit));
        }
    }, [anomalies, limit]);

    if (isLoading) {
        return (
            <div className="w-1/2 h-[300px] py-40 bg-white">
                <div className="flex flex-col px-150 justify-center items-center">
                    <Loader2 className="w-6 h-6 animate-spin"/>
                    <span className="font-semibold text-xl animation-pulse text-gray-700">Loading...</span>
                </div>
            </div>
        )
    }
    if(!anomalies ) return null;
    if (isError) {
        return (
            <div>Error: {error?.message}</div>
        )
    }
    
    const handleSelection = (e) => {
        const value = e.target.value;
        setGroupBy(value);
        if (value === 'weekly') {
            setLimit(4);
        } else if (value === 'daily') {
            setLimit(7);
        } else if (value === 'hourly') {
            setLimit(24); 
        }
    }

    return (
        <div className="bg-white rounded-xl px-5 mb-4 py-3 flex flex-col justify-center shadow-sm border border-gray-200 h-full">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold">Power Usage Chart</h1>
                <div className="px-10 flex items-center gap-4 text-sm">
                    <select value={groupBy} onChange={handleSelection} className="p-2 border-2 border-blue-500 rounded-md">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="hourly">Hourly</option>
                    </select>
                </div>
            </div>
            <ChartLineLabel data={filterData} className={'-px-3'} />
        </div>  
    );
}
export default AnomalyTrends;
