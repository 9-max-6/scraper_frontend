import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getBidById } from "@/db/queries/bids/get";
import BidData from "./_components/bid-data";
import Capabilities from "./_components/capabilities";
import Competitiveness from "./_components/competitiveness";
import Risk from "./_components/risk";
import { Suspense } from "react";
import { Fallback } from "./_components/fallback";
import Commercials from "./_components/commercials";
import OverviewGraph, { OverviewGraphFallback } from "./_components/overview-graph";
import { getMetricsById, getScoresByBidId } from "@/db/queries/metrics/get";
import { ShieldAlertIcon } from "lucide-react";
import Loading from "../_components/loading";
import HistoryGraph from "./_components/history-graph";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import OverviewGraphDetailed from "./_components/overview-detailed";

/**
 * web vitals - before changing the structure of the page to
 * use suspense and lazy loading
 * TTFB-
 * LCP-
 * 
 */

/**
 * 
 * @param param0 
 * @returns 
 */
async function AsyncPage({ params }: {
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
        return (
            <div className="mx-4 dash_container">
                "Bid not found"
            </div>
        )
    }
    const bidData = bid[0]

    if (!bidData.metrics) {
        return (
            <div className="mx-4 dash_container">
                "Metrics not found"
            </div>
        )
    }

    // getting metrics
    const metrics = await getMetricsById(bidData.metrics)

    if (!metrics) {
        return (
            <div className="mx-4 dash_container">
                "Bid not found"
            </div>
        )
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

    if (!latestScore) {
        return (
            <div className="mx-4 dash_container">
                Missing scores
            </div>
        )
    }

    // getting phase
    const phase = bidData.phase

    return (
        <div className="dash_container max-w-full"
        // remove the break-all text-wrap classes at the end.
        >
            <Card className="shadow-none border-none overflow-scroll scrollbar-hide h-full mx-auto max-w-[1080px]">
                {/* {JSON.stringify(bidData)} */}
                <CardHeader className="relative text-xl">
                    <CardTitle>
                        {bidData.title}
                    </CardTitle>

                    {/* urgent */}
                    <div className="top-4 right-8 absolute">
                        {
                            !bidData.urgent && (
                                <ShieldAlertIcon className="text-red-800" size={20} />
                            )
                        }
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-12">
                    {/* bid data */}
                    <BidData
                        score={latestScore.overallScore}
                        bidData={bidData}
                    />

                    {/* overview */}
                    <Tabs defaultValue="overview">
                        <TabsList className="ml-auto grid w-[300px] grid-cols-3">
                            <TabsTrigger value="overview">
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="history_overview">
                                History
                            </TabsTrigger>
                            <TabsTrigger value="history_detail">
                                Detailed
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview">
                            <Suspense fallback={<OverviewGraphFallback />}>
                                <OverviewGraph
                                    props={scoresArray[0]}
                                    phase={bidData.phase}
                                />
                            </Suspense>
                        </TabsContent>
                        <TabsContent value="history_detail">
                            <Suspense fallback={<OverviewGraphFallback />}>
                                <HistoryGraph props={scoresArray} />
                            </Suspense>
                        </TabsContent>
                        <TabsContent value="history_overview">
                            <Suspense fallback={<OverviewGraphFallback />}>
                                <OverviewGraphDetailed props={scoresArray} />
                            </Suspense>
                        </TabsContent>
                    </Tabs>




                    {/* capabilities */}
                    <Suspense fallback={<Fallback />}>
                        <Capabilities
                            id={metrics[0].capabilitiesId}
                            score={latestScore.capabilitiesScore}
                            phase={phase}
                            bidId={bidData.id}
                        />
                    </Suspense>

                    {/* commercials */}
                    <Suspense fallback={<Fallback />}>
                        <Commercials
                            id={metrics[0].commercialsId}
                            score={latestScore.commercialsScore}
                            phase={phase}
                            bidId={bidData.id}
                        />
                    </Suspense>

                    {/* competitiveness */}
                    <Suspense fallback={<Fallback />}>
                        <Competitiveness
                            id={metrics[0].competitivenessId}
                            score={latestScore.competitivenessScore}
                            phase={phase}
                            bidId={bidData.id}
                        />
                    </Suspense>

                    {/* risk */}
                    <Suspense fallback={<Fallback />}>
                        <Risk
                            id={metrics[0].riskId}
                            score={latestScore.riskScore}
                            phase={phase}
                            bidId={bidData.id}
                        />
                    </Suspense>
                </CardContent>
                <CardFooter>
                    @max
                </CardFooter>
            </Card>
        </div>
    )
}

export default function Page({ params }: {
    params: Promise<{
        bidId: string;
    }>;
}) {
    return (
        <Suspense fallback={<Loading />}>
            <AsyncPage params={params} />
        </Suspense>
    )
}