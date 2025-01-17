import { getBidById } from "@/db/queries/bids/get"
import { getClients, getClientsById } from "@/db/queries/donors/get"
import EditBidForm from "../_components/edit-bid-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DeleteBid from "../_components/delete-bid"

export default async function Page({
    params
}: {
    params: Promise<{
        bidId: string
    }>
}) {

    const bidId = (await params).bidId

    if (!bidId || !Number(bidId)) {
        return (
            <div>
                Error!!
            </div>
        )
    }

    const bidData = await getBidById(Number(bidId))

    if (!bidData || !bidData[0]) {
        return <div>
            Error!!
        </div>
    }

    const client = await getClientsById(bidData[0].client)

    if (!client || !client[0]) {
        return (
            <div>
                Error!!
            </div>
        )
    }

    const clients = await getClients()

    if (!clients) {
        return (
            <div>
                Error!!
            </div>
        )
    }
    const props = {
        clients,
        bidData,
        client
    }

    return (
        <div className="dash_container mx-4">

            <Tabs defaultValue="bid_data">
                <TabsList className="ml-auto">

                    <TabsTrigger value="bid_data">
                        Edit bid data
                    </TabsTrigger>
                    <TabsTrigger value="delete">
                        Delete bid
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="delete">
                    <div className="max-w-[1080px]">
                        <DeleteBid bidId={bidId} />
                    </div>
                </TabsContent>
                <TabsContent value="bid_data">
                    <div className="max-w-[1080px]">
                        <EditBidForm props={props} />
                    </div>
                </TabsContent>
            </Tabs>

        </div>
    )
}
