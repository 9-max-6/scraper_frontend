"use client"

import { Frown, TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

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
import { formatDate } from "date-fns"


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
            <Card className="shadow-none border-none">
                <CardHeader>
                    {/* <CardTitle>
                        Detailed overview
                    </CardTitle> */}
                    {/* <CardDescription>
                        Showing trend for the last five edits
                    </CardDescription> */}
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <CardDescription className="flex flex-col items-center gap-2">
                        Not enough edits to view this tab
                        <Frown size={32} strokeWidth={1} />
                    </CardDescription>
                </CardContent>
                <CardHeader>
                    {/* just for spacing */}
                </CardHeader>
            </Card>
        )
    }

    const firstFiveScores = props.slice(0, 5)
    const chartData = [
        { score: firstFiveScores[4].overallScore, date: firstFiveScores[4].createdAt },
        { score: firstFiveScores[3].overallScore, date: firstFiveScores[3].createdAt },
        { score: firstFiveScores[2].overallScore, date: firstFiveScores[2].createdAt },
        { score: firstFiveScores[1].overallScore, date: firstFiveScores[1].createdAt },
        { score: firstFiveScores[0].overallScore, date: firstFiveScores[0].createdAt },
    ]
    return (
        <Card>
            <CardHeader>
                <CardTitle>Overall scores overview</CardTitle>
                <CardDescription>{formatDate(firstFiveScores[0].createdAt, 'do LLL')} - {formatDate(firstFiveScores[4].createdAt, 'do LLL')}</CardDescription>
            </CardHeader>
            <CardContent className="p-12">
                <ChartContainer config={chartConfig}>
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
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={2}
                            tickFormatter={(value) => formatDate(value, "do LLL")}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            dataKey="score"
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
