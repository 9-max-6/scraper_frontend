import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";

export default function StatsTwo() {
    return (
        <Card className="aspect-video">
            <CardHeader>
                <CardDescription>
                    Total Revenue
                </CardDescription>
            </CardHeader>
            <CardContent>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    $500k
                </h1>
            </CardContent>
            <CardHeader>
                <CardDescription>
                </CardDescription>
            </CardHeader>
        </Card>
    )
}