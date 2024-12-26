"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { SelectScore } from "@/db/schema/scores"
import { Thresholds } from "./bid-profile-text"

const chartConfig = {
    threshold: {
        label: "Threshold",
        color: "hsl(var(--chart-2))",
    },
    score: {
        label: "Score",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

function getThreshold(phase: string, metric: string) {
    const entry = Thresholds[phase as keyof typeof Thresholds]
    return entry[metric as keyof typeof entry]
}

export default function OverviewGraph(
    { props, phase }:
        {
            props: Partial<SelectScore>,
            phase: string
        }) {
    const chartData = [
        { metric: "Capability", threshold: getThreshold(phase, "capabilities"), score: props.capabilitiesScore },
        { metric: "Competitiveness", threshold: getThreshold(phase, "competitiveness"), score: props.competitivenessScore },
        { metric: "Commercials", threshold: getThreshold(phase, "commercials"), score: props.commercialsScore },
        { metric: "Risk", threshold: getThreshold(phase, "risk"), score: props.riskScore },
    ]

    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Showing latest comparison of metrics against phase-dependent thresholds</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-4">
                <ChartContainer className="col-span-3 max-h-[500px]" config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="metric"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value}
                        />
                        <YAxis domain={[0, 200]} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="threshold" fill="var(--color-threshold)" radius={4} />
                        <Bar dataKey="score" fill="var(--color-score)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Bid has an overall score of <span className="text-bold">{props.overallScore}</span><TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total performance across the four metrics
                </div>
            </CardFooter>
        </Card>
    )
}

export function OverviewGraphFallback() {
    return (
        <div>
            <Skeleton className="h-96" />
        </div>
    )
}