import { getBdInputBydId, getCommercialsById } from "@/db/queries/metrics/get";
import Error from "../../_components/error";
import { getBidById } from "@/db/queries/bids/get";
import { Suspense } from "react";
import Loading from "@/app/bids/_components/loading";
import EditCommercials from "../../_components/comm-tab";

export async function AsyncPage({ params }: {
    params: Promise<{
        commId: string,
        bidId: string,
    }>
}) {
    const { commId, bidId } = await params;

    /**
     * Check if the commId is a number
     */
    const id = Number(commId);
    if (!id) {
        console.log("comm")
        return (

            <Error />
        )
    }
    /**
     * Check if the bidId is a number
     */
    const bidIdMutated = Number(bidId);
    if (!bidIdMutated) {
        console.log("")
        return (

            <Error />
        )
    }

    /**
     * Get the commercial by id
     */
    const comm = await getCommercialsById(id);
    if (!comm || !comm[0]) {
        console.log("comm")
        return (

            <Error />
        )
    }

    /**
     * Get the bdInput by id
     */
    const bdInput = await getBdInputBydId(comm[0].bdInputId)
    if (!bdInput || !bdInput[0]) {
        console.log("bdInput ")
        return (

            <Error />
        )
    }

    /**
     * Get the bid by id
     */
    const bidData = await getBidById(bidIdMutated)
    if (!bidData || !bidData[0]) {
        console.log("bidData ")
        return (

            <Error />
        )
    }

    const budget = bidData[0].budget;
    const duration = bidData[0].duration;

    return (
        <div className="mx-4 max-w-[1080px] dash_container">
            Commercials
            <EditCommercials
                comm={comm[0]}
                bdInput={bdInput[0]}
                budget={budget}
                duration={duration}
                bidId={bidIdMutated}
            />
        </div>
    )
}

export default function Page({ params }: {
    params: Promise<{
        commId: string,
        bidId: string,
    }>
}) {
    return (
        <Suspense fallback={< Loading />}>
            <AsyncPage params={params} />
        </Suspense>
    )
}
