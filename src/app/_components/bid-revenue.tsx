import { getBidRevenue } from "@/db/queries/stats/revenue"
import { formatRevenue } from "../_components/utils"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"


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
        <Card className="w-full max-h-full box-border" >
            <CardHeader>
                <CardDescription>
                    Total Revenue
                </CardDescription>
            </CardHeader>
            <CardContent>
                <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {formatRevenue(revenue)}
                </h3>
            </CardContent>
        </Card>
    )
}