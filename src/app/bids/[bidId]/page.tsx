import OverviewGraph from "@/app/_components/overview-graph";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getBidById } from "@/db/queries/bids/get";
import BidData from "./_components/bid-data";
import Capabilities from "./_components/capabilities";
import Competitiveness from "./_components/competitiveness";
import Risk from "./_components/risk";
import { Suspense } from "react";
import { Fallback } from "./_components/fallback";
import Commercials from "./_components/commercials";
import { OverviewGraphFallback } from "./_components/overview-graph";
import { getMetricsById, getScoresByBidId } from "@/db/queries/metrics/get";

export default async function Page({ params }: {
    params: Promise<{
        bidId: string;
    }>;
}) {
    const idPromise = (await params).bidId

    const id = Number(idPromise)
    if (!id) {
        return <div>Invalid ID</div>
    }

    const bid = await getBidById(id);

    if (!bid) {
        throw new Error("Bid not found");
    }
    const bidData = bid[0]

    if (!bidData.metrics) {
        throw new Error("Metrics not found");
    }

    // getting metrics
    const metrics = await getMetricsById(bidData.metrics)

    if (!metrics) {
        throw new Error("Metrics not found");
    }

    // getting scores
    const scoresArray = await getScoresByBidId(id)

    if (!scoresArray) {
        return (
            <div className="mx-4 dash_container">
                Missing scores
            </div>
        )
    }
    const latestScore = scoresArray[0]

    // getting phase
    const phase = bidData.phase

    return (
        <div className="dash_container max-w-full"
        // remove the break-all text-wrap classes at the end.
        >
            <Card className="shadow-none border-none overflow-scroll scrollbar-hide h-full mx-auto max-w-[1080px]">
                {/* {JSON.stringify(bidData)} */}
                <CardHeader className="">
                    <CardTitle>
                        {bidData.title}
                    </CardTitle>
                    <CardDescription>
                        {bidData.des}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-12">
                    {/* bid data */}
                    <BidData />

                    {/* overview */}
                    <Suspense fallback={<OverviewGraphFallback />}>
                        <OverviewGraph />
                    </Suspense>

                    {/* capabilities */}
                    <Suspense fallback={<Fallback />}>
                        <Capabilities
                            id={metrics[0].capabilitiesId}
                            score={latestScore.capabilitiesScore}
                            phase={phase}
                        />
                    </Suspense>


                    {/* commercials */}
                    <Suspense fallback={<Fallback />}>
                        <Commercials
                            id={metrics[0].commercialsId}
                            score={latestScore.commercialsScore}
                            phase={phase}
                        />
                    </Suspense>

                    {/* competitiveness */}
                    <Suspense fallback={<Fallback />}>
                        <Competitiveness
                            id={metrics[0].competitivenessId}
                            score={latestScore.competitivenessScore}
                            phase={phase}
                        />
                    </Suspense>

                    {/* risk */}
                    <Suspense fallback={<Fallback />}>
                        <Risk
                            id={metrics[0].riskId}
                            score={latestScore.riskScore}
                            phase={phase} />
                    </Suspense>
                </CardContent>
                <CardFooter>
                    @max
                </CardFooter>
            </Card>
        </div>
    )
}