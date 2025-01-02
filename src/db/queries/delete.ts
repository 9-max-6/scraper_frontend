/* eslint-disable @typescript-eslint/no-explicit-any */

import { bidsTable } from "../schema/bids";
import { eq } from "drizzle-orm";
import { db } from "..";
import { revalidateTag } from "next/cache";


export async function deleteBid(id: number) {
    try {
        const result = await db.delete(bidsTable).where(eq(bidsTable.id, id));
        revalidateTag('overdue_bid_count')
        revalidateTag('healthy_bid')
        revalidateTag('top_scorer')
        revalidateTag('top_bid')
        return result;
    } catch (error: any) {
        console.error("DB: deleteBid: ", error.toString());
        return undefined;
    }
}
// add revalidate tag for bid_count