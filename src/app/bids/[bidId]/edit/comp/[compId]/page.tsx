import { getCompetitivenessById } from "@/db/queries/metrics/get";
import Error from "../../_components/error";
export default async function Page({ params }: {
    params: Promise<{
        compId: string,
        bidId: string,
        metricsId: string,
    }>
}) {
    const { compId, bidId, metricsId } = await params;

    const id = Number(compId);
    if (!id) {
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

    const comp = await getCompetitivenessById(id);
    if (!comp || !comp[0]) {
        return (
            <Error />
        )
    }

    return (
        <div className="dash_container mx-4">
            Edit competitiveness
            {compId}
            {bidId}
            {JSON.stringify(comp)}

        </div>
    )
}