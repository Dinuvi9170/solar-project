import { useGetWeatherByCityQuery } from "@/lib/redux/query";
import { Loader2, Thermometer, Wind, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import Capacityfactor from "./capacityfactor";

const WeatherData=()=>{
    const [coords,SetCoords] = useState(null)
    
    useEffect(()=>{
       if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                SetCoords({
                    lat:position.coords.latitude,
                    lon:position.coords.longitude
                })
            }
        )
       }else{
        console.log("Error in accessing location")
        return;
       }
    },[])
    const{data,isLoading,isError,error}=useGetWeatherByCityQuery(coords,{skip:!coords});
    if(isLoading || !coords){
        return(
        <div className="w-full h-64 flex mb-4 items-center justify-center rounded-xl bg-white">
            <div className="flex flex-col gap-2 items-center">
                <Loader2 className="w-6 h-6 animate-spin"/>
                <span className="font-semibold text-xl text-gray-700">Loading...</span>
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
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 my-4">
            <div className="rounded-xl bg-[url('/images/solarpanels.jpg')] bg-cover bg-center p-4 sm:p-6 flex flex-col gap-4">
                <div className="bg-black/60 rounded-lg px-4 py-2 w-fit">
                    <span className="text-white font-bold text-lg">Weather Conditions</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-black/60 rounded-xl p-4 flex items-center gap-3">
                        <div className="flex px-5 items-center ">
                            <div className="bg-white/60 p-2 rounded-md">
                                <Thermometer color='white' className="w-5 h-5"/>
                            </div>
                            <div className="flex flex-col px-2 text-white">
                                <span className="font-bold text-lg leading-tight">{data.current.temp_c} °C</span>
                                <span className="text-xs font-bold">Temperature</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black/60 rounded-xl p-4 flex items-center gap-3">
                        <div className="flex px-5 items-center ">
                            <div className="bg-white/60 p-2 rounded-md">
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
            <div className="rounded-xl bg-blue-300 flex flex-col gap-4">
                <div className="px-6 py-5 flex flex-col">
                    <div className="flex text-white items-center gap-2 font-bold">
                        <Zap className="w-4 h-4" color="green"/>
                        <span className="text-lg text-black">Capacity Factor</span>
                    </div>
                    <span className="text-md text-gray-900">Efficiency of the solar unit over the past week</span>
                    <div className="flex justify-center text-sm text-white">
                        <Capacityfactor/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherData;