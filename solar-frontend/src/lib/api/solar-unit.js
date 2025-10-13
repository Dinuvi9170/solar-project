const BaseUrl='http://localhost:8000/api';

export const getSolarUnitbyId = async(id)=>{
    try{
        const res= await fetch(`${BaseUrl}/solar-units/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        //convert json into js object
        const data = await res.json()
        console.log(data)
        return data;
    }catch(error){
        console.log(error);
    }
}