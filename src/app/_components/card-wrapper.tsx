import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import BidRevenue from "./bid-revenue"
import BidCount from "./bid-count"
import OppCount from "./opp-count"
import OtherStat from "./other-stat"

export default async function CardWrapper() {
    return (
        <div className="grid border-box grid-cols-4 w-full h-full col-span-4 gap-4">
            <BidRevenue />
            <BidCount />
            <OppCount />
            <OtherStat />
        </div>
    )
}

