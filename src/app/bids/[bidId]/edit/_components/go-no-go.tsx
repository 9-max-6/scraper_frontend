"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SelectBid } from "@/db/schema/bids";
import { SquareArrowLeft, SquareArrowRight } from "lucide-react";
import { useState } from "react";

export default function GoNoGO({ props }: {
    props: {
        bidData: SelectBid
    }
}) {
    const [deleteConfirm, setdeleteConfirm] = useState("")

    const handleDelete = () => {
        // logic for the deletion of a bid
        console.log("Delete", deleteConfirm)
    }
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
    return (
        <div className="flex flex-col gap-4">
            <Card className="">
                <CardHeader>
                    <CardTitle>
                        Promote to the next phase.
                    </CardTitle>
                    <CardDescription>
                        Select the demote or promote button to move the bid to the next or previous phase.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <div className="ml-auto flex gap-2">
                        <Button variant="secondary">
                            Demote <SquareArrowLeft />
                        </Button>
                        <Button>
                            Promote <SquareArrowRight />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className=" shadow-none">
                <CardHeader>
                    <CardTitle>
                        No go
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    This bid is in the go phase
                    Click here to go to the next phase
                </CardContent>
            </Card>
            <Card className=" shadow-none">
                <CardHeader>
                    <CardTitle>
                        Urgent
                    </CardTitle>
                    <CardDescription>
                        Set the level of urgency of the bid.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <div className="ml-auto flex gap-2">
                        <Button variant="secondary">
                            Not urgent <SquareArrowLeft />
                        </Button>
                        <Button>
                            Urgent <SquareArrowRight />
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Card className=" shadow-none border-red-500">
                <CardHeader>
                    <CardTitle>
                        Danger zone
                    </CardTitle>
                    <CardDescription>
                        Type delete and click confirm to permanently delete the bid
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <div className="max-w-[600px]">
                        <Input
                            placeholder="Delete..."
                            onChange={(e) => {
                                setdeleteConfirm(e.target.value)
                            }}
                        />
                    </div>
                    <div className="ml-auto">
                        <Button variant="destructive">
                            Confirm
                        </Button>

                    </div>

                </CardContent>
            </Card>
        </div >
    )
}