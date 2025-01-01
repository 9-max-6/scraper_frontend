import { Suspense } from "react"
import { getTopScorer, topBid } from "@/db/queries/stats/health"
import OverviewGraph from "../bids/[bidId]/_components/overview-graph";
import { SelectScore } from "@/db/schema/scores";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

/**
 * 
 * @returns 
 */
export async function AsyncOverviewGraph() {
    const topScorerId = await getTopScorer();

    if (!topScorerId) {
        return (
            <div>
                Error!
            </div>
        )
    }
    const topBidData = await topBid(topScorerId);
    const props = topBidData.topBidScore[0] as Partial<SelectScore>;
    const phase = topBidData.topBidData[0].phase;
    return (
        <Card>
            <Link href={`/bids/${topBidData.topBidData[0].id}`}>
                <CardHeader>
                    <CardTitle>{topBidData.topBidData[0].title}</CardTitle>
                    <CardDescription>
                        Showing the highest performing bid
                    </CardDescription>
                </CardHeader>
                <OverviewGraph props={props} phase={phase} />
            </Link>

        </Card>
    )
}

export default function OverviewDashGraph() {
    return (
        // make this a skeleton loader component.
        <Suspense fallback={<div> Loading ...</div>}>
            <AsyncOverviewGraph />
        </Suspense>
    )
}