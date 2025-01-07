import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getClientsById } from "@/db/queries/donors/get";
import { Clock, DollarSign, HeartHandshake, StarHalf, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { getDeadline, getTime } from "./utils";
import Link from "next/link";
import { formatDate } from "date-fns";
import GoNoGO from "../edit/_components/go-no-go";

export default async function BidData({ score, bidData }: {
    score: number;
    bidData: {
        id: number;
        title: string;
        des: string;
        createdAt: Date;
        deletedAt: Date | null;
        updatedAt: Date | null;
        deadline: Date | null;
        phase: "eoi" | "tender" | "capture" | null;
        author: string;
        client: number;
        country: string;
        biddingEntity: string
        technicalUnit: string
        consortiumRole: string;
        urgent: boolean;
        budget: number;
        duration: number;
        status: "undec" | "go_cap" | "tent_eoi" | "tent_cap" | "go_eoi" | "go_tender" | "tent_tender" | null;
        metrics: number | null
    }
}
) {

    const clientData = await getClientsById(bidData.client)

    if (!clientData || !clientData[0] || !bidData.deadline || !bidData.status) {
        console.log(clientData, bidData.deadline, bidData.status)
        return (
            <div>
                Not my backend bruv!!
            </div>
        )
    }

    const diff = getDeadline(bidData.deadline)
    return (
        <Card className="bg-primary/10">
            <CardContent className="pt-4">
                <div className="text-lg font-semibold">
                    <div className="my-2 flex gap-2 items-center text-sm">
                        <Button variant="ghost" className="hover:cursor-default pl-0 hover:bg-inherit">
                            <HeartHandshake size={32} color="#a51d2d" />{" "}{clientData[0].name}
                        </Button>
                        <Button variant="ghost" className="hover:cursor-default hover:bg-inherit">
                            <DollarSign size={32} /> {bidData.budget}
                        </Button>
                        <Badge variant="outline" className={
                            clsx(
                                {
                                    "bg-green-100 text-green-800": bidData.phase === "eoi",
                                    "bg-blue-100 text-blue-800": bidData.phase === "tender",
                                    "bg-yellow-100 text-yellow-800": bidData.phase === "capture",
                                }
                            )
                        }>
                            {bidData.phase}
                        </Badge>

                        <Badge variant="outline" className={
                            clsx(
                                {
                                    "bg-green-100 text-green-800": bidData.status?.startsWith("go"),
                                    "bg-red-100 text-red-800": bidData.status === "undec",
                                    "bg-yellow-100 text-yellow-800": bidData.status?.startsWith("tent"),
                                }

                            )
                        }>
                            {bidData.status}
                        </Badge>

                        {/* Score */}
                        <Button variant="ghost" className="ml-auto hover:cursor-default hover:bg-inherit">
                            <StarHalf size={32} />{score}
                        </Button>
                    </div>
                    <div className="px-2">
                        <small className="text-sm font-medium leading-none">
                            {bidData.des}
                            <div className="flex mt-2 gap-2 items-center">
                                <Button variant="ghost" className={clsx(
                                    "hover:cursor-default hover:bg-inherit text-bold pl-0",

                                    {
                                        "text-red-800 bg-text-red-400 hover:text-red-800": diff <= 0,
                                        "text-green-800 bg-text-green-400 hover:text-green-800": diff > 0
                                    })}
                                >
                                    <Clock /> {formatDate(bidData.deadline, "do LLLL, yyyy")}
                                </Button>
                                <Button variant="ghost" className="hover:bg-inherit cursor-default pl-0 border-none">
                                    <User2 />
                                    {bidData.author}
                                </Button>


                                <Button variant="ghost" className="hover:bg-inherit cursor-default pl-0 border-none">
                                    {bidData.biddingEntity}
                                </Button>
                            </div>
                        </small>
                    </div>


                </div>
            </CardContent>
            <CardFooter className="flex">
                <CardDescription className="text-sm">
                    {getTime(bidData.updatedAt, bidData.createdAt)}
                </CardDescription>
                <div className="ml-auto flex gap-2">
                    <Link href={`/bids/${bidData.id}/edit/bid_data`}>
                        <Button variant="link">
                            Edit
                        </Button>
                    </Link>
                    <GoNoGO bidData={bidData} />
                </div>

            </CardFooter>
        </Card>
    )
}
// no calls for this.
