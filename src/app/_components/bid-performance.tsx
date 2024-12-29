import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressGreen } from "@/components/ui/progress - green";
import { ProgressRed } from "@/components/ui/progressred";
import { Activity } from "lucide-react";
export default function BidPerformance() {
    return (
        <Card>
            <CardHeader className="relative">
                <CardTitle>
                    Bid performance
                </CardTitle>
                <CardDescription>
                    Breakdown of how bids are performing as per the metrics
                </CardDescription>

                <Button variant="link" className="absolute  text-green-500 hover:cursor-default right-4 top-4">
                    <Activity strokeWidth={3} />
                </Button>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                <Card className="rounded-sm shadow-none flex flex-col gap-2 p-4 border-none bg-muted">
                    <CardDescription>
                        10 Urgent bids
                    </CardDescription>
                    <ProgressGreen value={10} max={100} className="text-green-400" />
                </Card>
                <Card className="rounded-sm shadow-none flex flex-col gap-2 p-4 border-none bg-muted">
                    <CardDescription>
                        64 Healthy bids
                    </CardDescription>
                    <ProgressGreen value={64} max={100} className="text-green-400" />
                </Card>

                <Card className="rounded-sm shadow-none flex flex-col gap-2 p-4 border-none bg-muted">
                    <CardDescription>
                        20 Unhealthy bids
                    </CardDescription>
                    <ProgressRed value={24} max={100} className="text-green-400" />
                </Card>

                <Card className="rounded-sm shadow-none flex flex-col gap-2 p-4 border-none bg-muted">
                    <CardDescription>
                        10 Overdue bids
                    </CardDescription>
                    <ProgressRed value={10} max={100} className="text-green-400" />
                </Card>
            </CardContent>
        </Card>
    )
}