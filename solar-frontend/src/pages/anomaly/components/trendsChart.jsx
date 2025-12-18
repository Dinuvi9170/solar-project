"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

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
} from "@/components/ui/chart"

const chartConfig = {
  totalFourHourAnomalies: {
    label: "anomalies",
    color: "var(--color-blue-600)",
  },
  totalWeekAnomalies: {
    label: "anomalies",
    color: "var(--color-blue-600)",
  },
  totalDayAnomalies: {
    label: "anomalies",
    color: "var(--color-blue-600)",
  },
} 

export function ChartLineLabel({data}) {
    const isHourly = data && data.length > 0 && data[0]._id?.fourHour;
    const isweekly = data && data.length > 0 && data[0]._id?.week;
    return (
        <Card className="shadow-none border-none ">
        <CardContent >
            <ChartContainer className={'h-70 w-full'} config={chartConfig}>
            <LineChart
                accessibilityLayer
                data={data}
                margin={{
                top:20,
                left: 12,
                right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                dataKey={isHourly?"_id.fourHour":isweekly?"_id.week":"_id.date"}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                    if (isHourly) return value.split(' ')[1]; 
                    if (isweekly) return 'W' + value; 
                    return value.split('-').slice(1).join('/');
                }}
                />
                <ChartTooltip
                cursor={false}
                content={({ label, payload }) => {
                    if (!payload?.length) return null;
                    const value = payload[0].value;
                    return (
                        <div className="rounded-lg border bg-background px-3 py-2 shadow-sm">
                            <div className=" font-medium">
                            {isHourly? label.split(" ")[1]: isweekly? `Week ${label}`: label}
                            </div>
                            <div className="text-xs text-muted-foreground">
                            anomalies <span className="font-medium">{value}</span>
                            </div>
                        </div>
                    );
                }}
                />
                <Line
                dataKey={isHourly?"totalFourHourAnomalies":isweekly?"totalWeekAnomalies":"totalDayAnomalies"}
                type="natural"
                stroke="var(--color-totalFourHourAnomalies)"
                strokeWidth={2}
                dot={{
                    fill: "var(--color-totalFourHourAnomalies)",
                }}
                activeDot={{
                    r: 6,
                }}
                >
                <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                />
                </Line>
            </LineChart>
            </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-center text-sm">
            <div className="flex gap-2 leading-none text-gray-500 font-medium">
               {isHourly?"Hourly":isweekly?"Weekly":"Daily"} Anomalies
            </div>
        </CardFooter>
        </Card>
    )
}
