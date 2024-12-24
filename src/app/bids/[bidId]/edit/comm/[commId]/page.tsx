import { getCommercialsById } from "@/db/queries/metrics/get";
import Error from "../../_components/error";
import { getBidById } from "@/db/queries/bids/get";

export default async function Page({ params }: {
    params: Promise<{
        commId: string,
        bidId: string,
        metricsId: string,
    }>
}) {
    const { commId, bidId, metricsId } = await params;


    const id = Number(commId);
    if (!id) {
        return (
            <Error />
        )
    }
    const bidIdMutated = Number(bidId);
    if (!bidIdMutated) {
        return (
            <Error />
        )
    }

    const metrics = Number(metricsId);
    if (!metrics) {
        return (
            <Error />
        )
    }


    const comm = await getCommercialsById(id);
    if (!comm || !comm[0]) {
        return (
            <Error />
        )
    }

    const bidData = await getBidById(bidIdMutated)
    if (!bidData || !bidData[0]) {
        return (
            <Error />
        )
    }

    const budget = bidData[0].budget;
    const duration = bidData[0].duration;

    return (
        <div className="dash_container mx-4">
            Edit commercials
            {commId}
            {bidId}
            {JSON.stringify(comm)}
            {JSON.stringify(bidData)}
        </div>
    )
}