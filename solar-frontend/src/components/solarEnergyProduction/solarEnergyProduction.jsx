import {useState } from "react";
import EnergyProductionCard from "../../pages/home/components/energyProductCard";
import Tab from "../../pages/home/components/tab";
import { useGetEnergyRecordsBysolarIdQuery } from "@/lib/redux/query";
import { format, isSameDay, subDays, toDate } from "date-fns";
import { Loader2 } from "lucide-react";

const SolarEnergyProduction= ()=>{
    //click on buttons in the cards
    const Tabs=[{label:"All",value:"all"},
        {label:"Anomaly",value:"anomaly"}
    ]

    const [isClickedtab, SetisClickedtab]=useState(Tabs[0].value);

    const handleClickTab=((value)=>{
        SetisClickedtab(value)
    })
    
    //automatically handle fetching data
    const {data,isError,error,isLoading}=useGetEnergyRecordsBysolarIdQuery("68ed36a4a3ecf49f08f986ea");
    
    if(isLoading){
        return(
        <div className="w-full h-[300px} py-20">
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
    const FomattedData = data.map((el)=>{
        return{
            ...el,
            time: toDate(el.time)
        };
    })
    const lastrecord= FomattedData[0];
    const sevendayago= subDays(lastrecord.time,7);
    
    const filteredData= FomattedData.filter((el)=>{
         return el.time>= sevendayago        
    })
    const Days=[]
    
    for(let i = 0; i < 7; i++){
        const day = subDays(new Date(lastrecord.time), i); 
        const samedayData = filteredData.filter((el)=>{
            return isSameDay(new Date (el.time),day)
    });
        Days.push({
            date:day,
            records:samedayData,
            totalDayEnergy:samedayData.reduce(
            (total,el)=>{
                return total+=Number(el.energyGenerated)

            },0)
        });  
    }
    Days.reverse();
    console.log( Days);
    
    //calculate total production
    const total= Days.reduce((sum,day)=>{
        return sum+=Number(day.totalDayEnergy);

    },0);

    //filter data all or anomalies
    const filterData= Days.filter((day)=>{
        if(isClickedtab==="anomaly")
            return day.records.some((el)=>el.isAnomaly)
        else
            return true
    })

    return(
        <section className={"px-18 py-6 font-[Inter]"}>
           <div className={"mb-2"}>
                <h2 className="text-2xl font-bold mb-2">Solar Energy Production</h2>
                <p className="text-gray-600">Daily energy output for the past 7 days</p>
           </div>
           {/* button handling */}
           <div className="flex gap-3 ">
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
           {/* cards handling */}
           <div>
                {filterData.length===0?(
                    <div className="px-10 py-10">
                        <p>No anomalies available.</p>
                    </div>
                ):(
                    <div className="flex flex-col-7 gap-2">
                        {filterData.map((day)=>{
                            return (
                                <EnergyProductionCard
                                    key={day.date}
                                    day={format(day.date,"EEE")}
                                    date={format(day.date,"MMM dd")}
                                    production={day.totalDayEnergy.toFixed(1)}
                                    isAnomaly={day.records.some((el) => el.isAnomaly)}
                                />
                            ); 
                        })}
                    </div>
                )}
           </div>
           
           <div className="flex flex-col py-1 py-6 ml-1 -mr-2 ">
                <div className=" h-18 w-full border border-blue-200 rounded-lg flex flex-col-2 justify-between bg-blue-50 text-blue-600">
                    <div className=" p-4">
                        <span className="block text-xl font-bold">Weekly total</span>
                        <span className="block text-xs">Total energy produced this week</span>
                    </div>
                    <div className=" p-4 justify-items-end">
                        <span className="block text-xl font-bold">{total.toFixed(1)} kWh</span>
                        <span className="block text-xs">Avg:{(total/7).toFixed(1)}kWh/day</span>
                    </div>
                </div>
           </div>
        </section>
    );
};
export default SolarEnergyProduction;