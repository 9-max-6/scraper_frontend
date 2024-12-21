import { Card } from "@/components/ui/card";
import NewBidForm from "./_components/new-bid-form";
import { getClients } from "@/db/queries/get";

export default async function Page() {

    const clients = await getClients()

    const props = {
        clients
    }
    return (
        <Card className="mx-4 max-w-[1080px] shadow-none border-none px-24">
            <NewBidForm props={props} />
        </Card>
    )

} 