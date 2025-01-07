import { Card, CardDescription, CardHeader, } from "@/components/ui/card"
import { getBidCount } from "@/db/queries/stats/revenue"
import { BadgeDollarSign } from "lucide-react"

export default async function BidCount() {

    const bidcount = await getBidCount()

    return (
        < Card className="w-full relative bg-primary/10" >
            <div className="top-2 absolute right-2 z-10">
                <BadgeDollarSign className="text-amber-500" />

            </div>
            <CardHeader>
                <CardDescription>
                    Total bid count
                </CardDescription>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    {bidcount} bids
                </h3>
            </CardHeader>

        </Card>
    )
}
