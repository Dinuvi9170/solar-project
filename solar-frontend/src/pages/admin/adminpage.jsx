import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Plus, Loader2, Zap, SquareChartGantt } from "lucide-react";
import { useGetSolarUnitsQuery } from "@/lib/redux/query";
import { useNavigate } from "react-router-dom";

const AdminSolarUnits = () => {
  const navigate= useNavigate();
  const {data:units,isLoading}= useGetSolarUnitsQuery();
  const [search, setSearch] = useState("");
  
  if(isLoading){
      return(
          <div className="w-full h-[300px] py-40 bg-gray-100">
            <div className="flex flex-col px-150 justify-center items-center">
                <Loader2 className="w-6 h-6 animate-spin"/>
                <span className="font-semibold text-xl text-gray-700">Loading...</span>
            </div>
        </div>)
    }
    
    if(!units){
        return (
            <div className="w-full bg-gray-100 flex h-full">
                <div className="w-full h-[300px] flex justify-center items-center">
                    <span className="text-xl font-semibold text-blue-700">No solar unit found.</span>
                </div>     
            </div>
        )
    }

  const filteredUnits = (search != ""? 
    units.dataUnits?.filter((u) =>
        u.serialNumber.toLowerCase().includes(search.toLowerCase())
      )
  : units.dataUnits);

  const sortUnits= filteredUnits?[...filteredUnits].sort((a,b)=>
    a.serialNumber.localeCompare(b.serialNumber)
  ):[]

  return (
    <div className="p-4 md:p-6 w-full h-full bg-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Solar Units Management</h1>
        <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
          <Input
            placeholder="Search by serial number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Button className="flex items-center gap-1  bg-blue-500 hover:bg-blue-500/70"
            onClick={()=>navigate('/admin/solarunits/createsolarunit')}
          >
            <Plus className="w-4 h-4 " /> Add Solar Unit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortUnits.map((unit) => (
          <Card key={unit._id} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-md font-semibold flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Zap color='gray' className="w-4 h-4"/>
                  {unit.serialNumber}
                </div>
                <div className="flex">
                  <span
                  className={`font-semibold ${
                    unit.status === "ACTIVE"
                      ? "text-green-600"
                      : unit.status === "INACTIVE"
                      ? "text-gray-500"
                      : "text-yellow-600"
                  }`}
                >
                  {unit.status}
                </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="px-6 text-gray-500 ">
                {unit.capasity} kW
              </p>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" className="flex-1"
                  onClick={()=>navigate(`/admin/solarunits/editsolarunit/${unit._id}`)}
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button size="sm" onClick={()=>navigate(`/admin/solarunits/${unit._id}`)} 
                  className="flex-1 bg-blue-500 hover:bg-blue-500/70">
                  <SquareChartGantt className="w-4 h-4 mr-1" /> View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUnits.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No solar units found matching "{search}"
        </p>
      )}
    </div>
  );
};

export default AdminSolarUnits;
