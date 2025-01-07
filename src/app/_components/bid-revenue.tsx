import { getBidRevenue } from "@/db/queries/stats/revenue"
import { formatRevenue } from "../_components/utils"
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { EqualApproximately, PiggyBank } from "lucide-react";


export default async function BidRevenue() {

    const revenue = await getBidRevenue();

    if (!revenue) {
        return (
            <div>
                Error!
            </div>
        )
    }
    /**
     * have to find a way to represent the value of the revenue.
     */

    return (
        <Card className="w-full relative bg-primary/10 max-h-full box-border" >
            <div className="top-2 absolute right-2 z-10">
                <PiggyBank className="text-green-800" />
            </div>
            <CardHeader>
                <CardDescription>
                    Total Revenue
                </CardDescription>
                <h3 className="scroll-m-20 flex items-center gap-2 text-2xl font-semibold tracking-tight">
                    <EqualApproximately strokeWidth={0.5} /> ${formatRevenue(revenue)}
                </h3>
            </CardHeader>
        </Card>
    )
}