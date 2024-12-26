import { getRiskById } from "@/db/queries/metrics/get";
import Error from "../../_components/error";
import { Suspense } from "react";
import Loading from "@/app/bids/_components/loading";
import EditRisk from "../../_components/risk-tab";
/**
 * 
 * @param param0 
 * @returns 
 */
async function AsyncPage({ params }: {
    params: Promise<{
        riskId: string,
        bidId: string,
    }>
}) {
    const { riskId, bidId } = await params;
    const id = Number(riskId);
    if (!id) {
        return (
            <Error />
        )
    }
    const bid = Number(bidId);
    if (!bid) {
        return (
            <Error />
        )
    }


    const risk = await getRiskById(id);
    if (!risk || !risk[0]) {
        return (
            <Error />
        )
    }

    return (
        <div className="mx-4 max-w-[1080px] dash_container">
            Risk
            <div>
                <EditRisk props={risk} bid={bid} />
            </div>
        </div>
    )
}

export default function Page({ params }: {
    params: Promise<{
        riskId: string,
        bidId: string,
    }>
}) {
    return (
        <Suspense fallback={<Loading />}>
            <AsyncPage params={params} />
        </Suspense>
    )
}