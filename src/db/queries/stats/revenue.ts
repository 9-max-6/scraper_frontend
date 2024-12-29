import { db } from "@/db";
import { bidsTable } from "@/db/schema/bids";
import { clientsTable } from "@/db/schema/donors";
import { eq, sql } from "drizzle-orm";
import { phasesEnum } from "@/db/schema/bids";

export async function getBidRevenue() {
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



}

export async function getBidCount() {
    try {
        const bidCount = await db.$count(bidsTable)
        return bidCount;
    } catch (error) {
        console.log(error.toString())
    }
}

export async function getClientCount() {
    try {
        const bidCount = await db.$count(clientsTable)
        return bidCount;
    } catch (error) {
        console.log(error.toString())
    }
}


export async function getBidCountPerPhase(phase: "capture" | "eoi" | "tender") {
    try {
        const result = await db
            .select({
                count: sql`COUNT(*)`.as("count"),
            })
            .from(bidsTable)
            .where(eq(bidsTable.phase, phase as keyof typeof phasesEnum));

    } catch (error) {
        console.log(error.toString())
    }
}
