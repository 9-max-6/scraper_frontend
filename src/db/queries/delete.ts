/* eslint-disable @typescript-eslint/no-explicit-any */

import { bidsTable } from "../schema/bids";
import { eq } from "drizzle-orm";
import { db } from "..";
export async function deleteBid(id: number) {
    try {
        const result = await db.delete(bidsTable).where(eq(bidsTable.id, id));
        return result;
    } catch (error: any) {
        console.error("DB: deleteBid: ", error.toString());
        return undefined;
    }
}
