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
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
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

    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const RANGES = {
  "24h": { label: "Last 24 hours", ms: 24 * 60 * 60 * 1000, daily: false },
  "7d": { label: "Last 7 days", ms: 7 * 24 * 60 * 60 * 1000, daily: false },
  "30d": { label: "Last 30 days", ms: 30 * 24 * 60 * 60 * 1000, daily: true },
  "90d": { label: "Last 3 months", ms: 90 * 24 * 60 * 60 * 1000, daily: true },
} as const

type RangeKey = keyof typeof RANGES

type ChartPoint = {
  timestamp: number
  playersOnline: number
}

export function ChartAreaInteractive({ chartData }: { chartData: any[] }) {
  const [timeRange, setTimeRange] = React.useState<RangeKey>("7d")

  const filteredData = React.useMemo<ChartPoint[]>(() => {
    if (!Array.isArray(chartData) || chartData.length === 0) return []

    const range = RANGES[timeRange]
    const threshold = Date.now() - range.ms

    // 1. Normalisieren, ungültige Einträge verwerfen
    const processed: ChartPoint[] = chartData
        .map((item) => ({
          playersOnline: Number(item.playersOnline) || 0,
          timestamp: new Date(item.checkedAt).getTime(),
        }))
        .filter((item) => !isNaN(item.timestamp))

    // 2. Auf Zeitraum filtern (kein Fallback auf alle Daten)
    const inRange = processed.filter((item) => item.timestamp >= threshold)

    // 3. In Stunden- bzw. Tages-Buckets gruppieren, Maximum pro Bucket behalten
    const buckets = new Map<number, ChartPoint>()
    for (const item of inRange) {
      const bucket = new Date(item.timestamp)
      bucket.setMinutes(0, 0, 0)
      if (range.daily) bucket.setHours(0)
      const key = bucket.getTime()

      const existing = buckets.get(key)
      if (!existing || item.playersOnline > existing.playersOnline) {
        buckets.set(key, { timestamp: key, playersOnline: item.playersOnline })
      }
    }

    return Array.from(buckets.values()).sort((a, b) => a.timestamp - b.timestamp)
  }, [chartData, timeRange])

  const formatTick = (value: number) => {
    const date = new Date(Number(value))
    if (isNaN(date.getTime())) return ""
    return timeRange === "24h"
        ? date.toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" })
        : date.toLocaleDateString("de-CH", { day: "numeric", month: "short" })
  }

  return (
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <CardTitle>Statistics</CardTitle>
            <CardDescription>
              Player peaks – {RANGES[timeRange].label.toLowerCase()}
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={(v) => setTimeRange(v as RangeKey)}>
            <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto">
              <SelectValue placeholder="Last 7 days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {(Object.keys(RANGES) as RangeKey[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {RANGES[key].label}
                  </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          {filteredData.length === 0 ? (
              <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
                Keine Daten für diesen Zeitraum
              </div>
          ) : (
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
                      type="number"
                      scale="time"
                      domain={["dataMin", "dataMax"]}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={40}
                      tickFormatter={formatTick}
                  />
                  <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      width={45}
                      tickFormatter={(val) => Number(val).toLocaleString("de-CH")}
                  />
                  <ChartTooltip
                      cursor={{ stroke: "var(--color-playersOnline)", strokeWidth: 1 }}
                      content={
                        <ChartTooltipContent
                            indicator="dot"
                            labelFormatter={(_, payload) => {
                              const ts = payload?.[0]?.payload?.timestamp
                              const date = new Date(Number(ts))
                              if (isNaN(date.getTime())) return "Player Count"
                              return date.toLocaleString("de-CH", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            }}
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
                </AreaChart>
              </ChartContainer>
          )}
        </CardContent>
      </Card>
  )
}