import { getCompetitivenessById } from "@/db/queries/metrics/get";
import Error from "../../_components/error";
import { Suspense } from "react";
import Loading from "@/app/bids/_components/loading";
import EditCompetitiveness from "../../_components/comp-tab";

async function AsyncPage({ params }: {
    params: Promise<{
        compId: string,
        bidId: string,
    }>
}) {
    const { compId, bidId } = await params;

    const id = Number(compId);
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



    const comp = await getCompetitivenessById(id);
    if (!comp || !comp[0]) {
        return (
            <Error />
        )
    }

    return (
        <div className="mx-4 max-w-[1080px] dash_container">
            Competitiveness
            <div>
                <EditCompetitiveness props={comp} bid={bid} />
            </div>
        </div>
    )
}

export default function Page({ params }: {
    params: Promise<{
        compId: string,
        bidId: string,
    }>
}) {
    return (
        <Suspense fallback={<Loading />}>
            <AsyncPage params={params} />
        </Suspense>
    )
}
