import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressRed } from "@/components/ui/progressred";
import { Skeleton } from "@/components/ui/skeleton";
import { getHealthyBidsCount, getOverDueBidsCount, getUrgentBidCount } from "@/db/queries/stats/health";
import { getBidCount } from "@/db/queries/stats/revenue";
import { Activity } from "lucide-react";
import { Suspense } from "react";
export async function AsyncBidPerformance() {

    const healthBids = await getHealthyBidsCount();
    if (!healthBids) {
        return (
            <div>
                Error!
            </div>
        )
    }
    const bidCount = await getBidCount();
    if (!bidCount) {
        return (
            <div>
                Error!
            </div>
        )
    }

    const urgentBidCount = await getUrgentBidCount();
    if (!urgentBidCount || typeof urgentBidCount !== "number") {
        return (
            <div>
                Error!
            </div>
        )
    }

    const overDueBidCount = await getOverDueBidsCount();
    if (!overDueBidCount || typeof overDueBidCount !== "number") {
        return (
            <div>
                Error!
            </div>
        )
    }

    return (
        <Card className="shadow-none">
            <CardHeader className="relative">
                <CardTitle>
                    Bid performance
                </CardTitle>
                <CardDescription>
                    Breakdown of how bids are performing as per the metrics
                </CardDescription>

                <Button variant="link" className="absolute hover:cursor-default right-4 top-4">
                    <Activity strokeWidth={3} />
                </Button>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                <Card className="rounded-sm shadow-none flex flex-col gap-2 p-4 border-none bg-muted">
                    <CardDescription>
                        {
                            urgentBidCount == 0 ? "No urgent bids" : `${urgentBidCount} Urgent bid${urgentBidCount > 1 ? "s" : ""}`
                        }
                    </CardDescription>
                    <Progress value={Number(urgentBidCount)} max={bidCount} className="text-green-400" />
                </Card>
                <Card className="rounded-sm shadow-none flex flex-col gap-2 p-4 border-none bg-muted">
                    <CardDescription>
                        {
                            healthBids == 0 ? "No healthy bids" : `${healthBids} Healthy bid${healthBids > 1 ? "s" : ""}`
                        }
                    </CardDescription>
                    <Progress value={healthBids} max={bidCount} className="text-green-400" />
                </Card>

                <Card className="rounded-sm shadow-none flex flex-col gap-2 p-4 border-none bg-muted">
                    <CardDescription>
                        {
                            bidCount - healthBids == 0 ? "No unhealthy bids" : `${bidCount - healthBids} Unhealthy bid${bidCount - healthBids > 1 ? "s" : ""}`
                        }
                    </CardDescription>
                    <ProgressRed value={24} max={100} className="text-green-400" />
                </Card>

                <Card className="rounded-sm shadow-none flex flex-col gap-2 p-4 border-none bg-muted">
                    <CardDescription>
                        {
                            overDueBidCount == 0 ? "No overdue bids" : `${overDueBidCount} Overdue bid${overDueBidCount > 1 ? "s" : ""}`
                        }
                    </CardDescription>
                    <ProgressRed value={10} max={100} className="text-green-400" />
                </Card>
            </CardContent>
        </Card>
    )
}
export default function BidPerformance() {
    return (
        <Suspense fallback={<BidPerformanceFallback />}>
            <AsyncBidPerformance />
        </Suspense>
    )
}


export function BidPerformanceFallback() {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
        </div>
    )
}