import { getBidById } from "@/db/queries/bids/get";

export default async function Page({ params }: {
    params: Promise<{
        bidId: string;
    }>;
}) {
    const idPromise = (await params).bidId
    console.log(idPromise)

    const id = Number(idPromise)
    if (!id) {
        return <div>Invalid ID</div>
    }

    const bid = await getBidById(id);

    if (!bid) {
        throw new Error("Bid not found");
    }

    return (
        <div className="dash_container max-w-full">
            {JSON.stringify(bid)}
        </div>
    )
}