"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
} from "@/components/ui/chart"


const chartConfig = {
   value: {
    label: "Capacity Factor (%)",
  },
} 

export function ChartRadialShape({data}) {
        const chartData = [
        {
        name: "Capacity Factor",
        value: data.capacityFactor,
        fill: "var(--chart-2)",
        },
    ];
    return (
        <Card className="flex flex-col bg-blue-300 border-none shadow-none">
        <CardContent className="flex-1 pb-0">
            <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
            >
            <RadialBarChart
                data={chartData}
                startAngle={90}
                endAngle={90 - (data.capacityFactor / 100) * 360}
                innerRadius={80}
                outerRadius={140}
            >
                <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
                />
                <RadialBar dataKey="value" background />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                    content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                        <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                            >
                            {data.capacityFactor.toLocaleString()+'%'}
                            </tspan>
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                            >
                            Last 7 days
                            </tspan>
                        </text>
                        )
                    }
                    }}
                />
                </PolarRadiusAxis>
            </RadialBarChart>
            </ChartContainer>
        </CardContent>
        </Card>
    )
}
