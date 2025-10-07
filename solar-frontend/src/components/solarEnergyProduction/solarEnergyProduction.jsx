import { useState } from "react";
import EnergyProductionCard from "../energyProductCard";
import Tab from "../tab";

const SolarEnergyProduction= ()=>{
    const ProductionData=[
        {day: "Mon", date:"Aug 19", production:"34.1", isAnomaly:false},
        {day: "Tue", date:"Aug 20", production:"30.2", isAnomaly:false},
        {day: "Wed", date:"Aug 21", production:"44.7", isAnomaly:false},
        {day: "Thu", date:"Aug 22", production:"21.9", isAnomaly:true},
        {day: "Fri", date:"Aug 23", production:"41.2", isAnomaly:false},
        {day: "Sat", date:"Aug 24", production:"43", isAnomaly:false},
        {day: "Sun", date:"Aug 25", production:"26.8", isAnomaly:false}
    ];
    //click on buttons in the cards
    const Tabs=[{label:"All",value:"all"},
        {label:"Anomaly",value:"anomaly"}
    ]
    const handleClickTab=((value)=>{
        SetisClickedtab(value)
    })
    const [isClickedtab, SetisClickedtab]=useState(Tabs[0].value);
    //filter data all or anomalies
    const filterData= ProductionData.filter((el)=>{
        if(isClickedtab==="anomaly")
            return el.isAnomaly
        else
            return true
    })

    //calculate total production
    const total= ProductionData.reduce((sum,el)=>{
        return sum+=Number(el.production);

    },0);

    return(
        <section className={"px-18 py-6 font-[Inter]"}>
           <div className={"mb-2"}>
                <h2 className="text-2xl font-bold mb-2">Solar Energy Production</h2>
                <p className="text-gray-600">Daily energy output for the past 7 days</p>
           </div>
           {/* button handling */}
           <div className="flex gap-5 ">
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
                        <p>No data available.</p>
                    </div>
                ):(
                    <div className="flex flex-col-7 gap-2">
                        {filterData.map((el)=>{
                            return (
                                <EnergyProductionCard
                                    key={el.date}
                                    day={el.day}
                                    date={el.date}
                                    production={el.production}
                                    isAnomaly={el.isAnomaly}
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