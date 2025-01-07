"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
    phases: {
        label: "Phases",
    },
    capture: {
        label: "Capture",
        color: "hsl(var(--chart-3))",
    },
    eoi: {
        label: "EOI",
        color: "hsl(var(--chart-1))",
    },
    tender: {
        label: "Tender",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export default function BidDistribution({ props }: {
    props: {
        eoiCount: number;
        tenderCount: number;
        captureCount: number;
    }
}) {
    const chartData = [
        { phase: "capture", bidCount: props.captureCount, fill: "var(--color-capture)" },
        { phase: "eoi", bidCount: props.eoiCount, fill: "var(--color-eoi)" },
        { phase: "tender", bidCount: props.tenderCount, fill: "var(--color-tender)" },
    ]
    return (

        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>Bid Backlog</CardTitle>
                <CardDescription>Distribution of bids per phase</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer className="min-h-[50px] w-full max-h-[100px]" config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 0,
                        }}
                    >
                        <ChartLegend content={<ChartLegendContent />} />
                        <YAxis
                            dataKey="phase"
                            type="category"
                            tickLine={false}
                            tickMargin={5}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                        />
                        <XAxis dataKey="bidCount" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="bidCount" layout="vertical" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}


export function BidDistributionFallback() {
    return (
        <div>
            Loading...
        </div>
    )
}