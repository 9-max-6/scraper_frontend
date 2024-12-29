import BidRevenue from "./bid-revenue"
import BidCount from "./bid-count"
import OppCount from "./opp-count"
import ClientCount from "./client-count"

export default async function CardWrapper() {
    return (
        <div className="grid border-box grid-cols-4 w-full h-full col-span-4 gap-4">
            <BidRevenue />
            <BidCount />
            <OppCount />
            <ClientCount />
        </div>
    )
}

