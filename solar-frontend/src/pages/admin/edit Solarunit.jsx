import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowLeft, Save, Loader2, Calendar, Cpu, Hash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSolatUnitByIdQuery, useUpdateSolarUnitMutation } from "@/lib/redux/query";

const EditSolarUnit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: unit, isLoading } = useGetSolatUnitByIdQuery({ id });
    const [updateSolarUnit, { isLoading: isUpdating }] = useUpdateSolarUnitMutation();

    const [formData, setFormData] = useState({
        serialNumber: "",
        installationDate: "",
        capasity: "",
        status: "",
    });

    useEffect(() => {
        if (unit) {
        setFormData({
            serialNumber: unit.serialNumber || "",
            installationDate: unit.installationDate?.split("T")[0] || "",
            capasity: unit.capasity || "",
            status: unit.status || "",
        });
        }
    }, [unit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await updateSolarUnit({ id, ...formData }).unwrap();
        alert("Solar Unit updated successfully!");
        navigate(`/solar-units/${id}`);
        } catch (err) {
        console.error(err);
        alert("Error updating solar unit.");
        }
    };

    if (isLoading) {
        return (
        <div className="w-full h-[300px] py-40 bg-gray-100">
            <div className="flex flex-col justify-center items-center">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-semibold text-xl text-gray-700">Loading...</span>
            </div>
        </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 h-screen overflow-y-scroll w-full flex justify-center">
        <div className="w-full max-w-4xl space-y-6">
            <div className="flex items-center mb-4">
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

            <form onSubmit={handleSubmit} className="pb-10">
            <Card className="shadow-lg border mb-4 border-gray-200">
                <CardHeader className="bg-blue-50 p-4 rounded-t-md">
                <CardTitle className="text-xl font-semibold">Unit Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Serial Number */}
                <div className="flex flex-col gap-2">
                    <Label className="text-gray-600 font-medium flex items-center gap-2">
                    <Hash className="w-4 h-4" /> Serial Number
                    </Label>
                    <Input
                    type="text"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    className="border-gray-300"
                    required
                    />
                </div>

                {/* Capacity */}
                <div className="flex flex-col gap-2">
                    <Label className="text-gray-600 font-medium flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> Capacity (kW)
                    </Label>
                    <Input
                    type="number"
                    name="capasity"
                    value={formData.capasity}
                    onChange={handleChange}
                    className="border-gray-300"
                    required
                    />
                </div>

                {/* Installation Date */}
                <div className="flex flex-col gap-2">
                    <Label className="text-gray-600 font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Installation Date
                    </Label>
                    <Input
                    type="date"
                    name="installationDate"
                    value={formData.installationDate}
                    onChange={handleChange}
                    className="border-gray-300"
                    required
                    />
                </div>

                {/* Status */}
                <div className="flex flex-col gap-2">
                    <Label className="text-gray-600 font-medium">Status</Label>
                    <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                    <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                        <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                        <SelectItem value="MAINTENANCE">MAINTENANCE</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                </CardContent>
            </Card>

            {/* User Information */}
            <Card className="shadow-lg border border-gray-200">
                <CardHeader className="bg-blue-50 p-4 rounded-t-md">
                <CardTitle className="text-xl font-semibold">User Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                <p className="text-gray-700 font-medium">User ID:</p>
                <p className="text-gray-900 font-bold">{unit.userId?._id}</p>
                <div className="border-b w-full my-2" />
                <p className="text-gray-700 font-medium">Name:</p>
                <p className="text-gray-900 font-bold">
                    {unit.userId?.firstName} {unit.userId?.lastName}
                </p>
                <div className="border-b w-full my-2" />
                <p className="text-gray-700 font-medium">Email:</p>
                <p className="text-gray-900 font-bold">{unit.userId?.email}</p>
                </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
                <Button
                type="submit"
                disabled={isUpdating}
                className="flex items-center gap-2 px-6 py-2"
                >
                {isUpdating ? (
                    <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                    </>
                ) : (
                    <>
                    <Save className="w-4 h-4" /> Save Changes
                    </>
                )}
                </Button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default EditSolarUnit;
