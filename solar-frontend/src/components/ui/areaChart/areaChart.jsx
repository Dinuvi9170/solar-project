"use client"

import { CalendarDays, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/areaChart/chart"
import { format } from "date-fns"

export function ChartAreaAxes({data}) {

  const chartConfig = {
    totalDayEnergy: {
      label: "Daily Energy (kWh)",
      color: "var(--color-blue-600)",
    },
  } 
  return (
    <Card className={'shadow-none border-none'}>
      <CardContent >
        <ChartContainer config={chartConfig} className={'h-80 w-full'}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 10,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="_id.date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>{
                if(data.length>=28){
                  return format(new Date(value),"MMM dd")
                }else{
                  return format(new Date(value),"EEE")
                }
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
              tickFormatter={(value) => value +"kWh"}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="totalDayEnergy"
              type="natural"
              fill="var(--color-totalDayEnergy)"
              fillOpacity={0.4}
              stroke="var(--color-totalDayEnergy)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center items-center gap-4 text-xs">
          <div className="flex items-center gap-1 font-medium">
            <span className="w-3 h-3 rounded-xs bg-blue-600"/>
            <span className="text-gray-500">Power Output</span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <CalendarDays color="gray" className="w-4 h-4" />
            <span className="text-gray-500">Daily Data</span>
          </div>  
        </div>
      </CardFooter>
    </Card>
  )
}
