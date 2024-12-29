import { db } from "../../index"
import { bidsTable } from "../../schema/bids"
import { eq } from "drizzle-orm";
import { InsertBid } from "../../schema/bids";
import { revalidateTag } from "next/cache";

export async function dbPatchDataById(data: Partial<InsertBid>, id: number): Promise<boolean | undefined> {
    try {
        const updateData = {
            updatedAt: new Date(),
            ...data
        }
        await db.update(bidsTable).set(updateData).where(eq(bidsTable.id, id))

        // have to revalidate tag for bids

        revalidateTag('single-bid')
        // returning true for successful update.
        return true
    } catch (error: any) {
        console.log(error)
    }
}
