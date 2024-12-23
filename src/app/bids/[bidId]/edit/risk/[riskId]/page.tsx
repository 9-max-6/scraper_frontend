import { getRiskById } from "@/db/queries/metrics/get";
import Error from "../../_components/error";
export default async function Page({ params }: {
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

    const risk = await getRiskById(id);
    if (!risk || !risk[0]) {
        return (
            <Error />
        )
    }

    return (
        <div className="dash_container mx-4">
            Edit capability
            {riskId}
            {bidId}
            {JSON.stringify(risk)}

        </div>
    )
}