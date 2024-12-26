"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"

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
import { SelectScore } from "@/db/schema/scores"
import { format } from "date-fns"


const chartConfig = {
    score: {
        label: "Score",
        color: "hsl(var(--chart-1))",
    },
    date: {
        label: "Date",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export default function OverviewGraphDetailed({ props }: { props: Array<Partial<SelectScore>> }) {

    if (props.length < 5) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>
                        Detailed overview
                    </CardTitle>
                    <CardDescription>
                        Showing trend for the last five edits
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <CardDescription>
                        Not enough edits to view this tab
                    </CardDescription>
                </CardContent>
            </Card>
        )
    }

    const firstFiveScores = props.slice(0, 5)
    const chartData = [
        { scores: "", score: firstFiveScores[0].overallScore, date: firstFiveScores[0].createdAt },
        { scores: "", score: firstFiveScores[1].overallScore, date: firstFiveScores[1].createdAt },
        { scores: "", score: firstFiveScores[2].overallScore, date: firstFiveScores[2].createdAt },
        { scores: "", score: firstFiveScores[3].overallScore, date: firstFiveScores[3].createdAt },
        { scores: "", score: firstFiveScores[4].overallScore, date: firstFiveScores[4].createdAt },
    ]
    return (
        <Card>
            <CardHeader>
                <CardTitle>Overall scores overview</CardTitle>
                <CardDescription>{format(firstFiveScores[0].createdAt, 'dd-mm-yy')} - {format(firstFiveScores[4].createdAt, 'dd-mm-yy')}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer className="max-h-[500px]" config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="score"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value}
                        />
                        <YAxis domain={[0, 500]} />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            dataKey="scores"
                            type="natural"
                            stroke="var(--color-score)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-score)",
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
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trend in overall score <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing overall scores for the last 5 edits
                </div>
            </CardFooter>
        </Card>
    )
}
