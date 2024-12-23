import { getCapabilitiesById } from "@/db/queries/metrics/get";
import Error from "../../_components/error";
import EditCapabilitiess from "../../_components/cap-tab";

export default async function Page({ params }: {
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


    const cap = await getCapabilitiesById(id);
    if (!cap || !cap[0]) {
        return (
            <Error />
        )
    }


    return (
        <div className="mx-4 max-w-[1080px] dash_container">
            Capabilities
            {capId}
            {bidId}

            {JSON.stringify(cap)}
            <div>
                <EditCapabilitiess props={cap} />
            </div>
        </div>
    )
}

