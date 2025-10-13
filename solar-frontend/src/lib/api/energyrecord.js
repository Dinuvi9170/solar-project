const BaseUrl='http://localhost:8000/api';
export const getEnergyRecordsBysolarUnitId =async (SolarUnitId)=>{
    const res= await fetch(`${BaseUrl}/energyRecords/solar-unit/${SolarUnitId}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    const data= await res.json();
    console.log(data);
    return data;   
}