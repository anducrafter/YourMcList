"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartConfig = {
  playersOnline: {
    label: "Players Online",
    color: "hsl(var(--chart-1))",
  },
}

export function ChartAreaInteractive({ chartData }: { chartData: any[] }) {
  const [timeRange, setTimeRange] = React.useState("7d")

  const filteredData = React.useMemo(() => {
    if (!Array.isArray(chartData) || chartData.length === 0) return []

    // 1. Map to numeric format
    const processed = chartData.map((item) => ({
      ...item,
      playersOnline: Number(item.playersOnline) || 0,
      timestamp: new Date(item.checkedAt).getTime(),
    })).sort((a, b) => a.timestamp - b.timestamp)

    // 2. Filter Logic
    const now = new Date().getTime()
    let startThreshold = now
    if (timeRange === "24h") startThreshold -= 24 * 60 * 60 * 1000
    else if (timeRange === "7d") startThreshold -= 7 * 24 * 60 * 60 * 1000
    else if (timeRange === "30d") startThreshold -= 30 * 24 * 60 * 60 * 1000
    else if (timeRange === "90d") startThreshold -= 90 * 24 * 60 * 60 * 1000

    let filtered = processed.filter((item) => item.timestamp >= startThreshold)
    const dataToGroup = filtered.length > 0 ? filtered : processed

    // 3. Group by Hour (for 7d view) or Day
    const groupedMap = new Map()
    dataToGroup.forEach((item) => {
      const d = new Date(item.timestamp)
      const key = (timeRange === "30d" || timeRange === "90d")
        ? `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
        : `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getHours()}`

      if (!groupedMap.has(key) || item.playersOnline > groupedMap.get(key).playersOnline) {
        groupedMap.set(key, item)
      }
    })

    return Array.from(groupedMap.values())
  }, [chartData, timeRange])

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>GommeHD Player Statistics</CardTitle>
          <CardDescription>
            Player peaks for the last {timeRange}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto">
            <SelectValue placeholder="Last 7 days" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="24h">Last 24 hours</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillPlayers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-playersOnline)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-playersOnline)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={30}
              tickFormatter={(value) => {
                const date = new Date(Number(value))
                if (isNaN(date.getTime())) return ""
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tickMargin={8}
              tickFormatter={(val) => val.toLocaleString()}
            />
            <ChartTooltip
              cursor={{ stroke: 'var(--color-playersOnline)', strokeWidth: 1 }}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    // Try to convert whatever 'value' is into a date
                    const date = new Date(Number(value))
                    
                    // If the conversion fails, don't show "Loading..." - show a fallback
                    if (isNaN(date.getTime())) return "Player Count"
                    
                    return date.toLocaleString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="playersOnline"
              type="monotone"
              fill="url(#fillPlayers)"
              stroke="var(--color-playersOnline)"
              strokeWidth={2}
              connectNulls
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}