'use client'
import {
    Card,
    CardContent,
    CardTitle,
    CardHeader,
    CardFooter,
    CardDescription
} from "./ui/card";
import Image from 'next/image'
import DataCardFooter from "./data-card-footer";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { DollarSign, Clock, Target, User, Bookmark } from "lucide-react";
import { BidType } from "@/types/types";
import { useRouter } from 'next/navigation'; // Import the router for navigation
import { Button } from "./ui/button";

export default function DataCard({ entry }: { entry: BidType }) {
    const router = useRouter();
    // Initialize the router for navigation
    // Do the math to determine if the deadline is passed or not.
    // const deadlinePassed = (new Date() - entry.deadline) < 0
    return (

        <Card className="box-content">
            <CardHeader className="cursor-pointer" onClick={() => {
                router.push(`/bids/${entry.bidData.id}`); // Navigate to the opportunity details page
            }
            }>
                <div className="flex gap-2 justify-between w-full">
                    <div className="grow-0">
                        <Image
                            src="/dt_global_logo.jpeg" // Reference the image from the public directory
                            width={60} // Original width of the image
                            height={60} // Original height of the image
                            alt="DT Global Logo"
                        />
                    </div>
                    <div className="text-left grow self-start flex flex-col gap-2">
                        <CardTitle className="text-xl">
                            {entry.bidData.title}
                        </CardTitle>
                        <CardDescription>
                            {entry.bidData.client}
                        </CardDescription>
                    </div>

                </div>


            </CardHeader>
            <CardContent className="relative ml-12">
                <Separator className="mb-2" />
                <div className="grid grid-cols-4 gap-2 justify-between">
                    <div className="flex col-span-1  grow-1 flex-col gap-2">
                        <li className="list-none flex items-center gap-1">
                            <DollarSign /> {entry.metrics.commercials.contract ? entry.metrics.commercials.contract : "Missing..."}
                        </li>
                        <li className="list-none flex items-center gap-1">
                            <Clock /> {entry.metrics.commercials.project ? entry.metrics.commercials.project : "Missing..."}
                        </li>
                        <li className="list-none flex items-center gap-1">
                            <Target /> {entry.bidData.deadline ? entry.bidData.deadline : "Missing..."}
                        </li>

                    </div>


                    <div className="col-span-3 text-left">
                        <CardDescription className="text-semibold">

                            {entry.bidData.des}
                        </CardDescription>
                        <CardDescription className="my-2 flex gap-2 items-center text-sm">
                            <User />
                            {entry.bidData.author}

                        </CardDescription>
                        <CardDescription>
                            <Badge className={`my-2 hover:${entry.bidData.phase === 'Capture' ?
                                "bg-yellow-500" : (entry.bidData.phase === "Expression of Interest" ?
                                    "bg-green-400" : "")} self-start ${entry.bidData.phase === 'Capture' ?
                                        "bg-yellow-500" : (entry.bidData.phase === "Expression of Interest" ?
                                            "bg-green-400" : "")}`} >
                                {entry.bidData.phase}
                            </Badge>
                        </CardDescription>
                    </div>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="bg-muted flex items-center py-2">

                {/* Updated at: {entry.date} */}
                {/* Add a variable to the backend that tracks when the opportunity was
                updated and when it was created. */}
                <div className="mr-auto">
                    <CardDescription>
                        Updated at:{" "}{entry.bidData.date}
                    </CardDescription>
                </div>
                <div className="ml-auto flex ">
                    <Button variant="link">
                        <Bookmark size={48} />
                    </Button>
                    <DataCardFooter entry={entry} />
                </div>
            </CardFooter>
        </Card>

    )
}