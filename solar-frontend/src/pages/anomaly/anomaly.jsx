import AnomalyTrends from "./components/anomalyTrends";
import RecentAnomalies from "./components/recentfound";
import ResolvedStatus from "./components/status";
import TypesData from "./components/typesChart";

const Anomaly =()=>{
    return(
        <div className=" w-full h-screen bg-gray-100 overflow-y-scroll">
            <div className="px-8 py-2 flex flex-col">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Anomaly Detection</h1>
                    <span className="text-base text-gray-500">Monitor and investigate unusual patterns in wind turbine operations.</span>
                </div> 
                <ResolvedStatus/>
                <div className="flex w-full h-[500px] py-4 gap-4">
                    <div className="w-1/2 ">
                        <TypesData/>
                    </div>
                    <div className="w-1/2 ">
                        <AnomalyTrends />
                    </div>
                </div> 
                <div className="w-full shadow-md bg-white rounded-lg py-4 mb-4">
                    <div className="w-full h-10 flex p-4 items-center">
                        <span className="text-lg font-semibold">Recent Anomalies</span>
                    </div>
                    <RecentAnomalies/>
                </div>
            </div>   
        </div>
    )
}

export default Anomaly;