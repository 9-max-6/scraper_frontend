"use server"
import { patchRiskById } from "@/db/queries/metrics/patch";

export default async function patchRisk(id: number, data: {
    scopeOfWork: number;
    easeOfDoingBusiness: number;
    security: number;
    reputationalRisk: number;
},
    bid: number, score: number) {
    try {
        const result = await patchRiskById(id, {
            ...data,
            updatedAt: new Date()
        }, bid, score)

        return result;
    } catch (error: any) {
        console.error(error.toString())
        throw new Error("Error updating metric")
    }
}