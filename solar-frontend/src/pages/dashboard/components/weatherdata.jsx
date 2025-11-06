import { useGetWeatherByCityQuery } from "@/lib/redux/query";
import { Loader2, Thermometer, Wind, Zap } from "lucide-react";

const WeatherData=()=>{
    const coords = { lat: 6.941553, lon: 80.010628 }
    const{data,isLoading,isError,error}=useGetWeatherByCityQuery(coords);
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
    console.log(data)
    return(
        <div className="flex w-full h-[300px] my-4 gap-6 justify-center">
            <div className="flex flex-col w-1/2 h-full rounded-xl items-center bg-[url('/images/solarpanels.jpg')] bg-cover bg-center">
                <div className="mt-[20px] w-[500px] rounded-xl flex px-3 items-center h-[50px] bg-[#00000060]">
                    <span className="text-white font-bold text-lg">Weather Conditions</span>
                </div>
                <div className="mt-[20px] w-[500px] flex gap-4  h-[80px]">
                    <div className="w-1/2 h-full bg-[#00000060] flex rounded-xl">
                        <div className="flex px-5 items-center ">
                            <div className="flex bg-[#ffffff60] items-center justify-center p-1 w-10 h-10 rounded-md ">
                                <Thermometer color='white' className="w-5 h-5"/>
                            </div>
                            <div className="flex flex-col px-2 text-white">
                                <span className="font-bold text-lg leading-tight">{data.current.temp_c} °C</span>
                                <span className="text-xs font-bold">Temperature</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 h-full flex bg-[#00000060] rounded-xl">
                        <div className="flex px-5 items-center ">
                            <div className="flex bg-[#ffffff60] items-center justify-center p-1 w-10 h-10 rounded-md ">
                                <Wind color='white' className="w-5 h-5"/>
                            </div>
                            <div className="flex flex-col px-2 text-white">
                                <span className="font-bold text-lg leading-tight">{data.current.wind_mph} mph</span>
                                <span className="text-xs font-bold">Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/2 h-full justify-center flex bg-blue-400 rounded-xl ">
                <div className="px-6 py-5 flex flex-col">
                    <div className="flex text-white items-center font-bold">
                        <Zap className="w-4 h-4 mr-2"/>
                        <span className="text-lg ">Real-Time Power</span>
                    </div>
                    <div className="flex w-[500px] justify-between text-sm font-bold text-white">
                        <div className="flex flex-col gap-2">
                            <span>Avg Wind Speed(10min)</span>
                            <span>Avg Power(10min)</span>
                            <span>Peak Power(10min)</span>
                            <span>Total Energy</span>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span>7.8 m/s</span>
                            <span>280.4 kW</span>
                            <span>332.1 kW</span>
                            <span>4.0 GWh</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherData;