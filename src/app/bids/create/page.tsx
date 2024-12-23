import { Card } from "@/components/ui/card";
import NewBidForm from "./_components/new-bid-form";
import { getClients } from "@/db/queries/donors/get";
import Link from "next/link";

export default async function Page() {

    const clients = await getClients()

    if (!clients) {
        return (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-gray-400">No clients found</h1>
                <Link className="hover:text-blue-400 text-sm" href="/donors/">
                    Create new client
                </Link>
            </div>
        )
    }
    const props = {
        clients
    }
    return (
        <Card className="mx-4 max-w-[1080px] shadow-none border-none px-24">
            <NewBidForm props={props} />
        </Card>
    )

} 