import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {CalendarDays,Cpu,Gauge,User2,Power,ArrowLeft,Loader2,} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {useGetSolarUnitByIdQuery,useUpdateSolarUnitMutation} from "@/lib/redux/query";

const EditSolarUnit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: unit, isLoading} = useGetSolarUnitByIdQuery({id});
  const [updateSolarUnit, { isLoading: isUpdating }] =useUpdateSolarUnitMutation();

  const [formData, setFormData] = useState({
    serialNumber: "",
    installationDate: "",
    capasity: "",
    status: "",
    userId: "",
  });

  useEffect(() => {
    if (unit) {
      setFormData({
        serialNumber: unit.serialNumber || "",
        installationDate: unit.installationDate?.split("T")[0] || "",
        capasity: unit.capasity || "",
        status: unit.status || "ACTIVE",
        userId: unit.userId?._id || "User" || "", 
      });
    }
  }, [unit]);

  if (isLoading) {
    return (
      <div className="w-full h-[300px] py-40 bg-gray-100">
        <div className="flex flex-col justify-center items-center">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="font-semibold text-xl text-gray-700">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSolarUnit({
        id,
        updateData: { ...formData, capasity: Number(formData.capasity) },
      }).unwrap();
      alert("Solar Unit updated successfully!");
      navigate("/admin/solarunits");
    } catch (err) {
      console.error(err);
      alert("Error updating solar unit.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-6">
      <div className="flex mb-4 items-center -ml-80">
        <div className="flex pr-2">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          Edit Solar Unit
        </h1>
      </div>

      <Card className="w-full max-w-2xl shadow-xl border-none rounded-2xl bg-white/80 backdrop-blur-md">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="flex items-center gap-2 text-gray-700">
                <Gauge className="w-4 h-4 text-blue-500" /> Serial Number
              </Label>
              <Input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                className="border-gray-300 mt-2"
                disabled
              />
            </div>

            <div>
              <Label className="flex items-center gap-2 text-gray-700">
                <CalendarDays className="w-4 h-4 text-teal-500" /> Installation Date
              </Label>
              <Input
                type="date"
                name="installationDate"
                value={formData.installationDate}
                onChange={handleChange}
                className="border-gray-300 mt-2"
                required
              />
            </div>

            <div>
              <Label className="flex items-center gap-2 text-gray-700">
                <Power className="w-4 h-4 text-orange-500" /> Capacity (Watts)
              </Label>
              <Input
                type="number"
                name="capasity"
                value={formData.capasity}
                onChange={handleChange}
                className="border-gray-300 mt-2"
                required
              />
            </div>

            <div>
              <Label className="flex items-center gap-2 text-gray-700">
                <User2 className="w-4 h-4 text-purple-500" /> Assigned User ID
              </Label>
              <Input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="border-gray-300 mt-2"
              />
            </div>

            <div>
              <Label className="flex items-center gap-2 text-gray-700">
                <Cpu className="w-4 h-4 text-green-500" /> Status
              </Label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="MAINTAINANCE">Maintenance</option>
              </select>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                disabled={isUpdating}
                className="bg-blue-500 hover:bg-blue-500/80 text-white rounded-lg px-8 py-2 flex items-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditSolarUnit;
