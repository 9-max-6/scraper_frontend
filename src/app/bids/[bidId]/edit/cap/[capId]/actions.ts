"use server"
import { patchCapById } from "@/db/queries/metrics/patch";

export default async function patchById(id: number, data: {
    competence: number;
    countryExperience: number;
    clients: number;
},
    bid: number, score: number) {
    try {
        console.log("Running patchBydId. Payload: ", id, data, bid, score)
        const result = await patchCapById(id, {
            ...data,
            updatedAt: new Date()
        }, bid, score)

        return result;
    } catch (error: any) {
        console.error(error.toString())
        throw new Error("Error updating metric")
    }
}