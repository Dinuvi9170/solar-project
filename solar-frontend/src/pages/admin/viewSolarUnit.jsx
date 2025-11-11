import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Trash2,
  BarChart2,
  ArrowLeft,
  Loader2,
  Cpu,
  CalendarDays,
  Zap,
  User,
  Mail,
  Hash,
  Gauge,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSolatUnitByIdQuery } from "@/lib/redux/query";

const SolarUnitDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: unit, isLoading } = useGetSolatUnitByIdQuery({ id });

    if (isLoading) {
        return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-50">
            <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="font-semibold text-lg text-gray-700 animate-pulse">
                Loading Solar Unit Details...
            </span>
            </div>
        </div>
        );
    }

    if (!unit) {
        return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <span className="text-xl text-gray-600">No solar unit found.</span>
        </div>
        );
    }

    const formattedDate = new Date(unit.installationDate).toLocaleDateString();

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex justify-center overflow-y-auto">
            <div className="w-full max-w-6xl space-y-8">
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
                        Solar Unit Overview
                        </h1>
                    </div>
                    <p className="text-gray-500 text-sm mb-6">
                    Comprehensive details about the selected solar unit.
                    </p>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <Card className="shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-t-md">
                            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-blue-800">
                            <Gauge className="w-5 h-5 text-blue-600" /> Status Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex justify-between">
                            <div>
                                <p className="text-gray-600 font-medium">Unit ID</p>
                                <p className="text-gray-900 font-semibold break-all">
                                {unit._id}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-600 font-medium">Status</p>
                                <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    unit.status === "ACTIVE"
                                    ? "bg-green-100 text-green-700"
                                    : unit.status === "INACTIVE"
                                    ? "bg-gray-200 text-gray-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                                >
                                {unit.status}
                                </span>
                            </div>
                            </div>
                        </CardContent>
                        </Card>

                        <Card className="shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-t-md">
                            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-green-800">
                            <Cpu className="w-5 h-5 text-green-600" /> Installation Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                            <Hash className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-gray-600 font-medium">Serial Number</p>
                                <p className="text-gray-900 font-bold">{unit.serialNumber}</p>
                            </div>
                            </div>
                            <div className="flex items-center gap-3">
                            <CalendarDays className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-gray-600 font-medium">Installation Date</p>
                                <p className="text-gray-900 font-bold">{formattedDate}</p>
                            </div>
                            </div>
                            <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-gray-600 font-medium">Capacity</p>
                                <p className="text-gray-900 font-bold">{unit.capasity} kW</p>
                            </div>
                            </div>
                        </CardContent>
                        </Card>

                        <Card className="shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-t-md">
                            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-purple-800">
                            <User className="w-5 h-5 text-purple-600" /> User Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                            <Hash className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-gray-600 font-medium">User ID</p>
                                <p className="text-gray-900 font-bold break-all">
                                {unit.userId?._id || "N/A"}
                                </p>
                            </div>
                            </div>
                            <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-gray-600 font-medium">Name</p>
                                <p className="text-gray-900 font-bold">
                                {unit.userId?.firstName} {unit.userId?.lastName}
                                </p>
                            </div>
                            </div>
                            <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-gray-600 font-medium">Email</p>
                                <p className="text-gray-900 font-bold">{unit.userId?.email}</p>
                            </div>
                            </div>
                        </CardContent>
                        </Card>
                    </div>

                    <Card className="shadow-xl border border-gray-200 hover:shadow-2xl max-h-[350px] transition-all duration-300">
                        <CardHeader className="bg-blue-50 p-4 rounded-t-md">
                        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-blue-800">
                            <BarChart2 className="w-5 h-5 text-blue-600" /> Actions
                        </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 flex flex-col gap-4">
                        <Button
                            variant="outline"
                            className="flex items-center justify-center gap-2 hover:bg-blue-50"
                            onClick={()=>navigate(`/admin/solarunits/editsolarunit/${id}`)}
                        >
                            <Edit className="w-4 h-4" /> Edit Details
                        </Button>
                        <Button
                            variant="default"
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
                        >
                            <BarChart2 className="w-4 h-4" /> View Performance
                        </Button>
                        <Button
                            variant="destructive"
                            className="flex items-center justify-center gap-2"
                        >
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
