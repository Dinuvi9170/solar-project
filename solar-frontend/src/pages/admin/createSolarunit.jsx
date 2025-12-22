import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, Cpu, Gauge, User2, Power, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {z} from 'zod';
import { useCreateSolarUnitMutation, useGetAllUsersQuery} from "@/lib/redux/query";

const CreateFormSchema = z.object({
    serialNumber:z.string().min(1,{message:'Serial Number is required'}),
    installationDate: z.string().min(1, "Installation date is required"),
    capasity: z.number().min(100, "Capacity must be at least 100W"),
    status: z.enum(["ACTIVE","INACTIVE","MAINTAINANCE"]),
    userId: z.string().optional().or(z.literal(""))
});


const CreateSolarUnit = () => {
  const navigate = useNavigate();
  const [addSolarUnit, { isLoading }] = useCreateSolarUnitMutation();
  const {data:users, isLoading:loading}= useGetAllUsersQuery();
    
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CreateFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      await addSolarUnit({
        ...data,
        capasity: Number(data.capasity),
      }).unwrap();
      reset();
      alert("Solar Unit created successfully!");
      navigate("/admin/solarunits");
    } catch (err) {
      console.error(err);
      console.log(err)
      alert("Failed to create solar unit.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-6">
      <div className="flex mb-4 items-center md:-ml-80">
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

        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight">
          Create Solar Unit
        </h1>
      </div>

      <Card className="w-full max-w-2xl shadow-xl border-none rounded-2xl bg-white/80 backdrop-blur-md">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label className="flex items-center gap-2 text-gray-700">
                <Gauge className="w-4 h-4 text-blue-500" /> Serial Number
              </Label>
              <Input
                type="text"
                placeholder="e.g. SUN-001"
                {...register("serialNumber")}
                className="mt-2"
              />
              {errors.serialNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.serialNumber.message}
                </p>
              )}
            </div>
            <div>
              <Label className="flex items-center gap-2 text-gray-700">
                <CalendarDays className="w-4 h-4 text-teal-500" /> Installation Date
              </Label>
              <Input
                type="date"
                {...register("installationDate")}
                className="mt-2"
              />
              {errors.installationDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.installationDate.message}
                </p>
              )}
            </div>
            <div>
              <Label className="flex items-center gap-2 text-gray-700">
                <Power className="w-4 h-4 text-orange-500" /> Capacity (Watts)
              </Label>
              <Input
                type="number"
                placeholder="e.g. 5000"
                {...register("capasity", { valueAsNumber: true })}
                className="mt-2"
              />
              {errors.capasity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.capasity.message}
                </p>
              )}
            </div>
            <div>
              <Label className="flex items-center gap-2 text-gray-700">
                <User2 className="w-4 h-4 text-purple-500" /> Assigned UserId
              </Label>

              {!loading && users?.users ? (
                <select
                  {...register("userId")}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <option value="">No user assigned</option>
                  {users.users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.firstName} {user.lastName} ({user.email})
                    </option>
                  ))}
                </select>
              ) : (
                <p>Loading users...</p>
              )}

              {errors.userId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userId.message}
                </p>
              )}
            </div>
            <div>
              <Label className="flex items-center gap-2 text-gray-700">
                <Cpu className="w-4 h-4 text-green-500" /> Status
              </Label>
              <select
                {...register("status")}
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="MAINTAINANCE">Maintenance</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-500/80 text-white rounded-lg px-8 py-2 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" /> Create Solar Unit
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateSolarUnit;
