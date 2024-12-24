import { patchCapById } from "@/db/queries/metrics/patch";

export default async function patchById(id: number, data: {
    competence: number;
    countryExperience: number;
    clients: number;
    updatedAt: Date;
}) {
    try {
        const result = await patchCapById(id, data)
        return result;
    } catch (error: any) {
        console.error(error.toString())
    }
}