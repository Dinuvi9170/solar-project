"use client"

import { Pie, PieChart,Cell } from "recharts"
import {Card,CardContent,CardHeader,CardTitle,} from "@/components/ui/card"
import {ChartContainer,ChartTooltip,ChartTooltipContent,} from "@/components/ui/chart"

const chartConfig = {
  Vibration: {
    label: "Vibration",
    color: "var(--chart-1)",
  },
  PowerOutput: {
    label: "PowerOutput",
    color: "var(--chart-2)",
  },
  Temperature: {
    label: "Temperature",
    color: "var(--chart-3)",
  },
  Mechanical: {
    label: "Mechanical",
    color: "var(--chart-4)",
  }
} 

export function ChartPieLabel({data}) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center mt-4 pb-0">
        <CardTitle className={"text-lg font-bold"}>Pie Chart - Anomaly Types</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 -mt-10 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[400px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
                data={data}
                dataKey="count"
                nameKey="anomalyType"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                {data.map((entry, index) => (
                    <Cell
                    key={`cell-${index}`}
                    fill={chartConfig[entry.anomalyType]?.color || "#999"}
                    />
                ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
