import { useGetCapasityFactorQuery, useGetSolarUnitforUserQuery } from "@/lib/redux/query";
import { ChartRadialShape } from "./radialchart";
import { useUser } from "@clerk/clerk-react";


const Capacityfactor = ()=>{
    const {user} =useUser();
    const {data:solarunit}=useGetSolarUnitforUserQuery(undefined,{skip:!user});

    const {data, isLoading,isError,error} = useGetCapasityFactorQuery({id:solarunit?._id});

    if(isLoading) return null;

    if(isError) return <div>Err:{error}</div>
    return(
        <>
            <div className="flex w-full md:w-1/2 flex-col gap-2">
                <ChartRadialShape data={data}/>
            </div>
            <div className="flex w-full md:w-1/2 flex-col mt-5 md:mt-10 items-start gap-1">
                <span className="text-xl text-gray-700 font-bold">Last 7 days</span>
                <span className="text-4xl font-bold text-black">{data.capacityFactor.toLocaleString()+'%'}</span>
                <span className="text-gray-800 text-base mt-1 font-semibold">
                    The system operated at {data.capacityFactor.toLocaleString()+'%'} of its maximum theoretical capacity this week.</span>
            </div>
        </>
    )
}

export default Capacityfactor;