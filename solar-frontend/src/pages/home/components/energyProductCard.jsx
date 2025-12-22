import { useState } from "react";

const EnergyProductCard = (props)=>{
    const [isSelected, SetisSelected]=useState(false);
    
    const handleclickbutton = () => {
        SetisSelected(!isSelected);
        console.log(isSelected);
    };

    return(
        <button className="md:px-1 w-20 py-3 cursor-pointer" onClick={handleclickbutton}>
            <div className={ `relative border ${isSelected? "outline-2 outline-offset-2 outline-blue-600":null} 
            ${props.isAnomaly?"border-red-200":"border-gray-200"} w-44 h-42 rounded-lg border-3`}>
                { props.isAnomaly && (
                    <div className="absolute px-1 py-1 bg-red-500 rounded-bl-lg top-0 right-0 text-white">Anomaly</div>
                )}
                <div className="flex flex-col items-center pt-6 md:gap-y-1.5">
                    <span className="block text-sm font-semibold ">{props.day}</span>
                    <span className="block text-xs text-gray-600">{props.date}</span> 
                    <div className="pt-2 flex flex-col items-center">              
                        <span className={props.isAnomaly?"block text-2xl md:text-3xl text-red-600 font-bold":"block text-2xl md:text-3xl text-blue-600 font-bold"}>{props.production}</span>
                        <span className="block text-xs font-medium text-gray-600">kWh</span>
                    </div> 
                </div>
            </div>
        </button>
        
    )
}

export default EnergyProductCard;
