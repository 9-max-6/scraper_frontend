import { getCapabilitiesById } from "@/db/queries/metrics/get";
import Error from "../../_components/error";
import EditCapabilitiess from "../../_components/cap-tab";
import { Suspense } from "react";
import Loading from "@/app/bids/_components/loading";

async function AsyncPage({ params }: {
    params: Promise<{
        capId: string,
        bidId: string,
    }>
}) {


    const { capId, bidId } = await params;

    const id = Number(capId);
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


    const cap = await getCapabilitiesById(id);
    if (!cap || !cap[0]) {
        return (
            <Error />
        )
    }


    return (
        <div className="mx-4 max-w-[1080px] dash_container">
            Capabilities
            <div>
                <EditCapabilitiess props={cap} bid={bid} />
            </div>
        </div>
    )
}
export default function Page({ params }: {
    params: Promise<{
        capId: string,
        bidId: string,
    }>
}) {
    return (
        <Suspense fallback={< Loading />}>
            <AsyncPage params={params} />
        </Suspense>
    )
}

/**
 * I have to check if these calls I'm making to the backend will be 
 * cached everytime I visit the page of a particular bid and click
 * edit to be redirected to this page.
 */