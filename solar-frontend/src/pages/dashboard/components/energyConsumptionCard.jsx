const EnergyConsumptionCard=(props)=>{
    return(
        <div className="h-[60px] bg-gray-50 rounded-lg flex flex-col py-2 justify-center items-center hover:bg-blue-50">
            <span className="text-xs font-bold text-gray-500">{props.date}</span>
            <span className="text-md font-bold">{props.consumption} kW</span>
        </div>
    )
}
export default EnergyConsumptionCard;