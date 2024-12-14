import { Separator } from "@/components/ui/separator";
import { LifeBuoy, Send, OctagonAlert } from "lucide-react";
import ModeToggle from "@/components/toggle-mode";
import { NavSecondary } from "@/components/nav-secondary";
import { getBidById } from "@/lib/bid-service";
import Overview from "@/components/overview";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { BidProfileText } from '@/types/bid-profile-text'

import Commercials from "@/components/comm-tab";
import DataCardFooter from "@/components/data-card-footer";
import { BidType } from "@/types/types";
import { Suspense } from "react";

interface BadgeProperties {
    text: string;
    color: string;
}
interface ScoresProperties {
    capabilities: number;
    risk: number;
    competitiveness: number;
    commercials: number;
}
export interface OverviewProperties {
    entry: BidType;
    scores: ScoresProperties;
}
const navSecondary = [
    {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
    },
    {
        title: "Feedback",
        url: "#",
        icon: Send,
    },
];

async function getDetailedBid(bidId: number) {
    try {
        if (Number.isNaN(bidId)) {
            throw new Error("Bid ID is required")
        }
        const response = await getBidById(bidId)
        return response
    } catch (e) {
        const error = e as Error
        console.error("Error when fetching detailed biid", error.toString());
        return null;
    }
}

export default async function Page({ params }: { params: Promise<{ bidId: string }> }) {
    const bidId = (await params).bidId
    const optimisticBid = await getDetailedBid(parseInt(bidId))
    if (!optimisticBid) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Error fetching bid details. Please try again later.</p>
            </div>
        );
    }

    const bid = optimisticBid as BidType

    // const bidVersions = await getBidVersionsById(parseInt(bidId))

    /**
 * 
 * @returns 
 */
    function getBadgeText(): BadgeProperties | null {
        if (!bid) {
            return null
        }

        if (bid.bidData.phase === "Tender stage") {
            if (bid.bidData.go_capture) {
                return {
                    text: "Go tender",
                    color: "bg-green-300"
                }
            }
            if (bid.bidData.tent_capture) {
                return {
                    text: "Tentative",
                    color: "bg-yellow-300"
                }
            } else
                return {
                    text: "NO GO",
                    color: "bg-red-300"
                }
        }
        if (bid.bidData.phase === "Expression of Interest") {
            if (bid.bidData.go_eoi) {
                return {
                    text: "GO",
                    color: "bg-green-300"
                }
            }
            if (bid.bidData.tent_eoi) {
                return {
                    text: "Tentative",
                    color: "bg-yellow-300"
                }
            } else
                return {
                    text: "NO GO",
                    color: "bg-destructive"
                }
        }
        if (bid.bidData.phase === "Capture") {
            if (bid.bidData.go_capture) {
                return {
                    text: "GO",
                    color: "bg-green-300"
                }
            }
            if (bid.bidData.tent_capture) {
                return {
                    text: "Tentative",
                    color: "bg-yellow-300"
                }
            } else
                return {
                    text: "NO GO",
                    color: "bg-red-300"
                }
        }
        return {
            text: "NO GO",
            color: "bg-red-100"
        }
    }

    function calculateScores(): ScoresProperties {
        const getScore = (scores: number[], weights: number[]): number => {
            return scores.reduce((acc, score, index) => acc + score * weights[index], 0);
        }

        const getWeights = (category: { weight: number }[]): number[] => {
            const catWeights: number[] = []
            for (const cat of category) {
                catWeights.push(cat.weight)
            }
            return catWeights
        }
        return {
            capabilities: getScore(Object.values((bid.metrics.capabilities)), getWeights(BidProfileText.Capabilities)),
            competitiveness: getScore(Object.values((bid.metrics.competitiveness)), getWeights(BidProfileText.Competitiveness)),
            commercials: getScore(Object.values((bid.metrics.commercials)), getWeights(BidProfileText.Commercials)),
            risk: getScore(Object.values((bid.metrics.risk)), getWeights(BidProfileText.Risk)),
        }
    }

    const badge = getBadgeText();
    const text = badge ? badge.text : "";
    const color = badge ? badge.color : "";
    const scores = calculateScores()


    if (!bid) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Error fetching bid details. Please try again later.</p>
            </div>
        );
    }


    const props: OverviewProperties = {
        entry: bid,
        scores
    }


    return (
        <div className="grid grid-cols-9 my-2 w-full main-container overflow-hidden">

            <Card className="shadow-none border-none min-w-full col-span-6 relative main-container">
                {/* Render bid details here */}
                {/* <Separator /> */}
                <div className="flex gap-3">
                    <div>
                        <div>
                            <CardTitle className="text-xl">
                                {bid.bidData.title}
                            </CardTitle>

                            <CardDescription className="mt-2">
                                {bid.bidData.des}
                            </CardDescription>
                        </div>
                    </div>


                    {/* <div>
                        <Image
                            src="/dt_global_logo.jpeg"
                            alt="Donor logo"
                            width={50}
                            height={50}
                        />
                    </div> */}
                </div>
                <div className="flex justify-end gap-2 my-2">
                    <Button className={`${color} p-2 line-h-2 hover:bg-red-500`}>
                        {text}
                    </Button>


                    <Button className=" p-2 line-h-2">
                        {Object.values(scores).reduce((total, current) => total + current, 0)}
                    </Button>
                    {bid.bidData.urgent && (<div className="ml-auto">
                        <OctagonAlert size={36} color="#c01c28" />
                    </div>)}
                </div>
                <div className="overflow-scroll mt-8 scrollbar-hide h-[70vh]">
                    <Overview props={props} />
                </div>

            </Card>
            <div className="pl-12 col-span-3 relative">
                <div className="flex flex-col w-full">
                    <div className="flex gap-2 ">
                        <Commercials props={bid} />
                        <DataCardFooter entry={bid} />
                    </div>
                </div>
            </div>
        </div>
    );
}
