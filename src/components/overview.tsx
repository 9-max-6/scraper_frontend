"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts"
import { OverviewProperties } from "@/app/bids/[bidId]/page"
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
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { ReverseBidProfileText, Thresholds } from "@/types/bid-profile-text"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

export default function Overview({ props }: { props: OverviewProperties }) {
    function getTextCard(innerValue: [string, number]) {
        const genericName = innerValue[0];
        const genericValue = innerValue[1];
        const bufferTemp = ReverseBidProfileText[genericName as keyof typeof ReverseBidProfileText]
        if (bufferTemp) {
            return bufferTemp[genericValue as unknown as keyof typeof bufferTemp]
        }
    }


    const chartData = [
        { metric: "Capabilities", threshold: Thresholds[props.entry.bidData.phase as keyof typeof Thresholds].capabilities, score: props.scores.capabilities },
        { metric: "Commercials", threshold: Thresholds[props.entry.bidData.phase as keyof typeof Thresholds].commercials, score: props.scores.commercials },
        { metric: "Competitiveness", threshold: Thresholds[props.entry.bidData.phase as keyof typeof Thresholds].competitiveness, score: props.scores.competitiveness },
        { metric: "Risk", threshold: Thresholds[props.entry.bidData.phase as keyof typeof Thresholds].risk, score: props.scores.risk },
    ]

    function getCardColor(value: number) {
        const metric = chartData[value]
        if (metric.score >= metric.threshold) {
            return "bg-green-100"
        } else {
            return "bg-red-100"
        }
    }

    const chartConfig = {
        threshold: {
            label: "threshold",
            color: "lightgreen",
        },
        score: {
            label: "score",
            color: "lightblue",
        },
    } satisfies ChartConfig

    const categories = ["Capabilities", "Competitiveness", "Commercials", "Risk"]

    return (
        <Card className="shadow-none mb-20 border-none">
            <CardHeader className="p-0 mb-2">
                <CardTitle>Overview</CardTitle>
                <CardDescription>Quick view of how the bid is performing in different metrics</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <ChartContainer className="m-0 p-0" config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={true} />
                        <XAxis
                            dataKey="metric"
                            tickLine={true}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value}
                        />
                        <YAxis domain={[0, 200]} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="threshold" fill="var(--color-threshold)" radius={4}>
                            <LabelList dataKey="threshold" position="top" />
                        </Bar>
                        <Bar dataKey="score" fill="var(--color-score)" radius={4}>
                            <LabelList dataKey="score" position="top" />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>

            <div className="flex flex-col gap-8">
                {Object.values(props.entry.metrics).map((value, index) => {
                    return (
                        <Card key={index} className="shadow-none border-none relative">
                            <Separator />
                            <CardHeader className="flex">
                                <CardTitle>
                                    {categories[index]}
                                </CardTitle>
                                <div className="absolute top-2 right-2">
                                    <Button variant="outline" className={`${getCardColor(index)}`}>
                                        Score: {props.scores[categories[index].toLowerCase() as keyof typeof props.scores]}
                                    </Button>
                                </div>
                            </CardHeader>
                            <div className="gap-2 grid grid-cols-4">
                                {Object.entries(value).map((innerValue, index) => {
                                    return (
                                        <Card className="bg-muted shadow-none border-none" key={index}>
                                            <CardHeader>
                                                <CardTitle>
                                                    {(innerValue[0][0]).toUpperCase() + innerValue[0].slice(1, innerValue[0].length)}
                                                </CardTitle>
                                                <CardDescription>
                                                    {
                                                        getTextCard(innerValue)
                                                    }
                                                </CardDescription>
                                            </CardHeader>
                                        </Card>
                                    )
                                })}
                            </div>
                        </Card>
                    )
                })}
            </div>
        </Card>
    )
}