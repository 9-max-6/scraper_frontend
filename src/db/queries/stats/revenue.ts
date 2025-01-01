/* eslint-disable @typescript-eslint/no-explicit-any */

import { db } from "@/db";
import { bidsTable } from "@/db/schema/bids";
import { clientsTable } from "@/db/schema/donors";
import { eq, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const getBidRevenue = unstable_cache(async () => {
    try {

        const revenue = await db.select({ budget: bidsTable.budget }).from(bidsTable)
        if (revenue) {
            return revenue.reduce((acc, value) => {
                return acc + value.budget
            }, 0)
        } else {
            return 0;
        }
    } catch (error: any) {
        console.error(error.toString())
    }



},
    ['revenue'],
    {
        tags: ['revenue'],
    })

export const getBidCount = unstable_cache(async () => {
    try {
        const bidCount = await db.$count(bidsTable)
        return bidCount;
    } catch (error) {
        console.log(error.toString())
    }
},
    ['bid_count'],
    {
        tags: ['bid_count']
    },

)
export const getClientCount = unstable_cache(async () => {
    try {
        const bidCount = await db.$count(clientsTable)
        return bidCount;
    } catch (error) {
        console.log(error.toString())
    }
},
    ['client_count'],
    {
        tags: ['client_count']
    },
)

export const getBidCountCapture = unstable_cache(async () => {
    try {
        const result = await db
            .select({
                count: sql`COUNT(*)`.as("count"),
            })
            .from(bidsTable)
            .where(eq(bidsTable.phase, "capture"));

        return result;

    } catch (error) {
        console.log(error.toString())
    }
},
    ['count_capture'],
    {
        tags: ['count_capture']
    },
)

export const getBidCountEOI = unstable_cache(async () => {
    try {
        const result = await db
            .select({
                count: sql`COUNT(*)`.as("count"),
            })
            .from(bidsTable)
            .where(eq(bidsTable.phase, "eoi"));

        return result;

    } catch (error) {
        console.log(error.toString())
    }
},
    ['count_eoi'],
    {
        tags: ['count_eoi']
    },
)

export const getBidCountTender = unstable_cache(async () => {
    try {
        const result = await db
            .select({
                count: sql`COUNT(*)`.as("count"),
            })
            .from(bidsTable)
            .where(eq(bidsTable.phase, "tender"));

        return result;

    } catch (error) {
        console.log(error.toString())
    }
},
    ['count_tender'],
    {
        tags: ['count_tender']
    },
)
