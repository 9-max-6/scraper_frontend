import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getClientsById } from "@/db/queries/donors/get";
import { Clock, DollarSign, HeartHandshake, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { getTime } from "./utils";
import { formatDate } from "date-fns";
import Link from "next/link";

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
        phase: string | null;
        author: string;
        client: number;
        country: string;
        biddingEntity: string
        technicalUnit: string
        consortiumRole: string;
        urgent: boolean;
        budget: number;
        duration: number;
        status: string | null;
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
    return (
        <Card>
            <CardContent className="pt-4">
                <div className="flex flex-start items-start flex-col">
                    {score}
                </div>

                <div>

                    <div className="my-2 flex gap-2 items-center text-sm">

                        <Button variant="ghost" className="hover:cursor-default pl-0 hover:bg-inherit">
                            <HeartHandshake color="#a51d2d" />{" "}{clientData[0].name}
                        </Button>
                        <Button variant="ghost" className="hover:cursor-default hover:bg-inherit">
                            <DollarSign /> {bidData.budget}
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
                        {/* urgent */}

                    </div>

                    <CardDescription>
                        {bidData.des}
                        <div className="flex gap-2 items-center">
                            <Button variant="ghost" className="hover:bg-inherit cursor-default pl-0 border-none">
                                <User2 />
                                {bidData.author}
                            </Button>

                            <Button variant="ghost" className="hover:cursor-default hover:bg-inherit">
                                <Clock /> {formatDate(bidData.deadline, "dd-mm-yy")}
                            </Button>
                            <Button variant="ghost" className="hover:bg-inherit cursor-default pl-0 border-none">
                                {bidData.biddingEntity}
                            </Button>
                        </div>


                    </CardDescription>
                </div>
            </CardContent>
            <CardFooter className="flex">
                <CardDescription className="text-sm">
                    {getTime(bidData.updatedAt, bidData.createdAt)}
                </CardDescription>

                <Link className="ml-auto" href={`/bids/${bidData.id}/edit/bid_data`}>
                    <Button>
                        Edit
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
// no calls for this.
