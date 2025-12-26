import AnomalyTrends from "./components/anomalyTrends";
import RecentAnomalies from "./components/recentfound";
import ResolvedStatus from "./components/status";
import TypesData from "./components/typesChart";

const Anomaly =()=>{
    return(
        <div className=" w-full min-h-screen bg-gray-100 overflow-y-auto">
            <div className="px-4 md:px-8 py-2 flex flex-col">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Anomaly Detection</h1>
                    <span className="text-base text-gray-500">Monitor and investigate unusual patterns in wind turbine operations.</span>
                </div> 
                <ResolvedStatus/>
                <div className="flex flex-col md:flex-row  w-full h-full py-4 gap-4">
                    <div className="md:w-1/2 ">
                        <TypesData/>
                    </div>
                    <div className="md:w-1/2 ">
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