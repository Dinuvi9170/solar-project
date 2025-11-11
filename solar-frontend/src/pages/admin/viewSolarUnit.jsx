import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, BarChart2,ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { Progress } from "@/components/ui/progress";

const SolarUnitDetail = () => {
    const navigate=useNavigate();
  // Dummy data
  const unit = {
    _id: "69103213336e922cb0644ca6",
    serialNumber: "SUN-001",
    installationDate: "2025-08-31T18:30:00.000Z",
    capasity: 5000,
    status: "ACTIVE",
    userId: {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alicej019992356@gmail.com",
    },
    currentGeneration: 3200, // example current energy output
    lifetimeGeneration: 12000, // example total generation
  };

  const formattedDate = new Date(unit.installationDate).toLocaleDateString();

  return (
    <div className="p-6 bg-gray-100 h-screen overflow-y-scroll w-full flex justify-center">
      <div className="w-full max-w-5xl space-y-6">
        <div className="flex items-center mb-6">
            <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
            >
            <ArrowLeft className="w-4 h-4" />
            Back
            </Button>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Solar Unit Details</h1>
         <div className="flex gap-3 pb-8">
            <div className="flex flex-col gap-4 w-full">
                <Card className="shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
                <CardHeader className="bg-blue-50 p-4 rounded-t-md">
                    <CardTitle className="text-xl font-semibold">Status</CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex flex-col gap-4">
                    <div>
                    <p className="text-gray-600 font-medium">UnitId</p>
                    <p className="text-gray-900 font-semibold text-md">{unit._id}</p>
                    < div className='border-b w-full pt-1' />
                    </div>
                    <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Unit Status</span>
                    <span
                        className={`font-bold text-lg ${
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
                    < div className='border-b w-full pt-1' />
                    {/* <div className="flex flex-col gap-2">
                    <p className="text-gray-600 font-medium">Lifetime Generation</p>
                    <p className="text-gray-900 font-bold text-lg">{unit.lifetimeGeneration} kWh</p>
                    <Progress value={Math.min((unit.lifetimeGeneration / (unit.capasity * 10)) * 100, 100)} className="mt-2 h-2 rounded-lg"/> 
                    </div> */}
                </CardContent>
                </Card>
                
                <Card className="shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
                <CardHeader className="bg-blue-50 p-4 rounded-t-md">
                    <CardTitle className="text-xl font-semibold">Installation Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 gap-6">
                    <div>
                    <p className="text-gray-600 font-medium">Serial Number</p>
                    <p className="text-gray-900 font-bold text-lg">{unit.serialNumber}</p>
                    < div className='border-b w-full pt-1' />
                    </div>
                    <div>
                    <p className="text-gray-600 font-medium">Installation Date</p>
                    <p className="text-gray-900 font-bold text-lg">{formattedDate}</p>
                    < div className='border-b w-full pt-1' />
                    </div>
                    <div>
                    <p className="text-gray-600 font-medium">Capacity</p>
                    <p className="text-gray-900 font-bold text-lg">{unit.capasity} kW</p>
                    < div className='border-b w-full pt-1' />
                    </div>
                    <div>
                    {/* <p className="text-gray-600 font-medium">Current Output</p>
                    <p className="text-gray-900 font-bold text-lg">{unit.currentGeneration} kW</p> */}
                    {/* <Progress value={(unit.currentGeneration / unit.capasity) * 100} className="mt-2 h-2 rounded-lg"/> */}
                    </div>
                </CardContent>
                </Card>
                
                <Card className="shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
                <CardHeader className="bg-blue-50 p-4 rounded-t-md">
                    <CardTitle className="text-xl font-semibold">User Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 gap-6">
                    <div>
                    <p className="text-gray-600 font-medium">Name</p>
                    <p className="text-gray-900 font-bold text-lg">
                        {unit.userId.firstName} {unit.userId.lastName}
                    </p>
                    < div className='border-b w-full pt-1' />
                    </div>
                    <div>
                    <p className="text-gray-600 font-medium">Email</p>
                    <p className="text-gray-900 font-bold text-lg">{unit.userId.email}</p>
                    < div className='border-b w-full pt-1' />
                    </div>
                </CardContent>
                </Card>
            </div>

            <Card className="shadow-lg hover:shadow-xl h-[300px]  transition-shadow border border-gray-200">
            <CardHeader className="p-4 rounded-t-md -mb-10">
                <CardTitle className="text-xl font-semibold">Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col gap-4">
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" /> Edit Details
                </Button>
                <Button variant="default" className="flex-1 flex items-center justify-center gap-2">
                <BarChart2 className="w-4 h-4" /> View Performance
                </Button>
                <Button variant="destructive" className="flex-1 flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" /> Delete 
                </Button>
            </CardContent>
            </Card>
            </div>
        </div>
    </div>
  );
};

export default SolarUnitDetail;
