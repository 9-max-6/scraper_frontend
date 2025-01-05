"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectBid } from "@/db/schema/bids";
import { SquareArrowLeft, SquareArrowRight } from "lucide-react";

export default function GoNoGO({ bidData }: {
    bidData: SelectBid
}) {
    // const [deleteConfirm, setdeleteConfirm] = useState("")
    console.log(bidData)
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
    const getStatusText = (status: string) => {
        if (status === "undec") {
            return "The team is not going for this bid."
        } else if (status.startsWith('tent')) {
            return "The team is still deliberating on this bid."
        } else {
            return "The team is going for this bid."
        }
    }
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

            <Card className="">
                <CardHeader>
                    <CardTitle>
                        Go-No-Go.
                    </CardTitle>
                    <CardDescription>
                        {getStatusText(bidData.status)}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <p>
                        If anything has changed in the bid, you can update the status by selecting one of the options below.
                    </p>
                    <div className="ml-auto flex gap-2">
                        <Button variant="secondary">
                            Go <SquareArrowLeft />
                        </Button>
                        <Button>
                            No Go <SquareArrowRight />
                        </Button>
                        <Button variant="destructive">
                            Tentative <SquareArrowRight />
                        </Button>
                    </div>
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
                        <input
                            placeholder="delete..."
                            className="ring-1 min-w-[300px] ring-opacity-50 ring-transparent focus:ring-red-500 rounded-sm p-2 active:ring-red-500 hover:ring-red-500 focus:ring-opacity-100 active:ring-opacity-100 hover:ring-opacity-100 outline-none transition"
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