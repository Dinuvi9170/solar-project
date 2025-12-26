import {useState } from "react";
import EnergyProductionCard from "../../pages/home/components/energyProductCard";
import Tab from "../../pages/home/components/tab";
import { useGetEnergyRecordsBysolarIdQuery,useGetSolarUnitforUserQuery } from "@/lib/redux/query";
import { format, subDays} from "date-fns";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const SolarEnergyProduction= ()=>{
    const {user,isLoaded,isSignedIn}=useUser();
    const {data:solarunit}=useGetSolarUnitforUserQuery(undefined,{skip:!user || !isLoaded});

    //click on buttons in the cards
    const Tabs=[{label:"All",value:"all"},
        {label:"Anomaly",value:"anomaly"}
    ]

    const [isClickedtab, SetisClickedtab]=useState(Tabs[0].value);

    const CAPACITY_FACTOR_THRESHOLD = 20;

    const handleClickTab=((value)=>{
        SetisClickedtab(value)
    })
    
    //automatically handle fetching data
    const {data,isError,error,isLoading}=useGetEnergyRecordsBysolarIdQuery(
        {id:solarunit?._id,groupBy:"date",limit:7},{skip:!solarunit?._id});
    
    if(!solarunit?._id) return null;
    
    if(isLoading){
        return(
        <div className="w-full h-[300px] flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <Loader2 className="w-6 h-6 animate-spin"/>
                <span className="font-semibold text-xl animation-pulse text-gray-700">Loading...</span>
            </div>
        </div>)
    }
    if(!data || isError){
        return(
            <div>Error: {error?.message}</div>
        )
    }
    
    const Days = data?.length > 0
        ? data.map((el) => {
            const date = new Date(el._id.date);

            const capacityKW = solarunit.capasity; 
            const theoreticalMax = capacityKW * 12; 

            const capacityFactor =
                theoreticalMax > 0
                ? (Number(el.totalDayEnergy) / theoreticalMax) * 100
                : 0;

                return{
                    ...el,
                    date,
                    isAnomaly:capacityFactor < CAPACITY_FACTOR_THRESHOLD ,
                }
            })
        : [];

    if (Days.length === 0) return null;

    const lastrecord = Days[0];
    const sevendayago = subDays(new Date(lastrecord.date), 6);

    const weekData= Days.filter((day)=>{
        return day.date>=sevendayago
    })
    
    //calculate total production
    const total= weekData.reduce((sum,day)=>{
        return sum+=Number(day.totalDayEnergy);

    },0);

    //filter data all or anomalies
    const filterData= weekData.filter((day)=>{
        if(isClickedtab==="anomaly")
            return day.isAnomaly
        else
            return true
    })

    return(
        isSignedIn?(
        <section className={"px-4 md:px-18 md:py-6 font-[Inter]"}>
           <div className={"mb-2"}>
                <h2 className="text-2xl font-bold mb-2">Solar Energy Production</h2>
                <p className="text-gray-600 text-sm md:text-base">Daily energy output for the past 7 days</p>
           </div>
           <div className="flex gap-2 md:gap-3 ">
                {Tabs.map((tab)=>{
                    return(
                      <Tab
                        key={tab.value}
                        tab={tab}
                        isClickedtab={isClickedtab}
                        handleClickTab={handleClickTab}
                      />
                    )
                })}
           </div>
           <div>
                {filterData.length===0?(
                    <div className="px-4 md:px-10 py-10">
                        <p>No anomalies available.</p>
                    </div>
                ):(
                    <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                        {filterData.map((day)=>{
                            return (
                                <EnergyProductionCard
                                    key={day.date}
                                    day={format(day.date,"EEE")}
                                    date={format(day.date,"MMM dd")}
                                    production={day.totalDayEnergy.toFixed(1)}
                                    isAnomaly={day.isAnomaly}
                                />
                            ); 
                        })}
                    </div>
                )}
           </div>
           
           <div className="flex flex-col py-6">
                <div className=" md:h-18 w-full border border-blue-200 rounded-lg flex flex-col-2 justify-between bg-blue-50 text-blue-600">
                    <div className=" p-4">
                        <span className="block text-lg md:text-xl font-bold">Weekly total</span>
                        <span className="block text-xs sm:text-sm">Total energy produced this week</span>
                    </div>
                    <div className=" p-4 justify-items-end">
                        <span className="block text-lg md:text-xl font-bold">{total.toFixed(1)} kWh</span>
                        <span className="block text-xs sm:text-sm">Avg:{(total/7).toFixed(1)}kWh/day</span>
                    </div>
                </div>
           </div>
        </section>
        ):("")
    );
};
export default SolarEnergyProduction;