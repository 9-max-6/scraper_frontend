"use server"
import { patchCompById } from "@/db/queries/metrics/patch";

export default async function patchCompetitivenessById(id: number, data: {
    numberOfBidders: number;
    competitorProfile: number;
    partnerCapacity: number;
    clientPreference: number;
    clientIntelligence: number;
    clientProcurement: number;
    availabilityOfResources: number;
},
    bid: number, score: number) {
    try {
        const result = await patchCompById(id, {
            ...data,
            updatedAt: new Date()
        }, bid, score)

        return result;
    } catch (error: any) {
        console.error(error.toString())
        throw new Error("Error updating metric")
    }
}