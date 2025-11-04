"use client"

import { TrendingUp } from "lucide-react"
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
              tickFormatter={(value) => format(new Date(value),"MMM dd")}
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
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
