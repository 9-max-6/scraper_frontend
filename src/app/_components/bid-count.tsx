import { Card, CardContent, CardDescription, CardHeader, } from "@/components/ui/card"
import { getBidCount } from "@/db/queries/stats/revenue"

export default async function BidCount() {

    const bidcount = await getBidCount()

    return (
        < Card className="w-full" >
            <CardHeader>
                <CardDescription>
                    Total bid count
                </CardDescription>
            </CardHeader>
            <CardContent>
                <h3 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {bidcount} bids
                </h3>
            </CardContent>
        </Card>
    )
}