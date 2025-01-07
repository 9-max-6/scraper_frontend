"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { SelectBid } from "@/db/schema/bids";
import clsx from "clsx";
import { PlaneTakeoff } from "lucide-react";

export default function GoNoGO({ bidData }: {
    bidData: SelectBid
}) {
    // const [deleteConfirm, s
    // const handleDelete = () => {
    //     // logic for the deletion of a bid
    //     console.log("Delete", deleteConfirm)
    // }
    /**
     * so I have to find a way to make this work very well
     * If the bid is in the undec stage, then of course the text should
     * be saying:
     * "The team is not sure the way forward for this bid."
     * If this is the case, then the options should be:
     * Verdict on capture stage.
     * Then something like GO Capture,
     * or tentative capture.
     * 
     * Then I can have another card for the phase, that just says the phase
     * and then gives the option for promoting the bid to the next phase and 
     * another one for demoting it. All these must have a dialog button that makes the confirmation and
     * calls the function that makes the submission.
     * 
     * The last one is of course one that deletes the bid.
     */
    // const getStatusText = (status: string) => {
    //     if (status === "undec") {
    //         return "The team is not going for this bid."
    //     } else if (status.startsWith('tent')) {
    //         return "The team is still deliberating on this bid."
    //     } else {
    //         return "The team is going for this bid."
    //     }
    // }
    return (
        <Dialog>
            <DialogTrigger>
                <Button>
                    Go? {" "}  <PlaneTakeoff strokeWidth={3} />
                </Button>
            </DialogTrigger>
            <DialogContent className="ml-16 max-w-[720px]">
                <Card className="shadow-none border-none">
                    <CardHeader>
                        <CardTitle>
                            GO-NO-GO
                        </CardTitle>
                        <CardDescription>
                            Advance the project to the next phase and choose a status
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        <CardDescription className="flex gap-2">
                            <Badge variant="outline" className={
                                clsx(
                                    "ml-auto",
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
                        </CardDescription>

                        <Progress value={bidData.phase === 'capture' ? 1 / 3 * 100 : bidData.phase === 'eoi' ? 2 / 3 * 100 : 100} max={100} />

                    </CardContent>
                    <CardFooter className="flex">
                        <div className="ml-auto space-x-2">
                            {
                                bidData.status.startsWith('go') ? (
                                    <>
                                        <Button variant="secondary" onClick={() => {
                                            // make bid tentative
                                        }}>
                                            Tentative
                                        </Button>
                                        <Button variant="destructive" onClick={() => {
                                            // make undec
                                        }}>
                                            No go
                                        </Button>

                                    </>) : (
                                    <>
                                        <Button variant="secondary" onClick={() => {
                                            // make bid tentative
                                        }}>
                                            Tentative
                                        </Button>
                                        <Button onClick={() => {
                                            // make go
                                        }}>
                                            Go
                                        </Button>
                                    </>
                                )
                            }

                        </div>
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    )
}