import { db } from "@/db";
import { metricsTable } from "@/db/schema/metrics";
import { unstable_cache } from "next/cache";
import { eq, desc } from "drizzle-orm";
import { capabilitiesTable } from "@/db/schema/capabilities";
import { bidInputTable, commercialsTable } from "@/db/schema/commercials";
import { riskTable } from "@/db/schema/risk";
import { competitivenessTable } from "@/db/schema/competitiveness";
import { scoresTable } from "@/db/schema/scores";

export const getMetricsById = unstable_cache(
    async (id: number) => {
        try {
            const result = await db.select().from(metricsTable).where(eq(metricsTable.id, id));
            return result;
        } catch (e: any) {
            console.log("Error fetching metric by id", e.toString());
        }
    },
    ['metrics'],
    {
        tags: ['metrics'],
    }
)

export const getCapabilitiesById = unstable_cache(
    async (id: number) => {
        try {
            const result = await db.select().from(capabilitiesTable).where(eq(capabilitiesTable.id, id));
            // logging database fetch
            console.log("Fetching capability from the database.")
            return result;
        } catch (e: any) {
            console.log("Error fetching capability by id", e.toString());
        }
    },
    ['capabilities'],
    {
        tags: ['capabilities'],
    }
)

export const getCommercialsById = unstable_cache(
    async (id: number) => {
        try {
            const result = await db.select().from(commercialsTable).where(eq(commercialsTable.id, id));
            return result;
        }
        catch (e: any) {
            console.log("Error fetching commercial by id", e.toString());
        }
    },
    ['commercials'],
    {
        tags: ['commercials'],
    }
)

export const getRiskById = unstable_cache(
    async (id: number) => {
        try {
            const result = await db.select().from(riskTable).where(eq(riskTable.id, id));
            return result;
        }
        catch (e: any) {
            console.log("Error fetching risk by id", e.toString());
        }
    },
    ['risks'],
    {
        tags: ['risks'],
    }
)
export const getCompetitivenessById = unstable_cache(
    async (id: number) => {
        try {
            const result = await db.select().from(competitivenessTable).where(eq(competitivenessTable.id, id));
            return result;
        }
        catch (e: any) {
            console.log("Error fetching commercial by id", e.toString());
        }
    },
    ['competitiveness'],
    {
        tags: ['competitiveness'],
    }
)

export const getScoresByBidId = unstable_cache(
    async (id: number) => {
        try {
            const result = await db
                .select()
                .from(scoresTable)
                .where(eq(scoresTable.bid, id))
                .orderBy(desc(scoresTable.createdAt))

            if (result.length === 0) {
                // adding default values
                const defaultScores = {
                    bid: id,
                    overallScore: 0,
                    riskScore: 0,
                    commercialsScore: 0,
                    competitivenessScore: 0,
                    capabilitiesScore: 0
                }
                const [scoreId] = await db.insert(scoresTable).values(defaultScores).returning({ id: scoresTable.id });
                if (!scoreId.id) {
                    console.log("Error inserting default scores");
                }
                return [defaultScores];
            }
            return result;
        }
        catch (e: any) {
            console.log("Error fetching scores by id", e.toString());
        }
    },
    ['scores'],
    {
        tags: ['scores'],
    }
)

export const getBdInputBydId = unstable_cache(
    async (id: number) => {
        try {
            const result = await db.select().from(bidInputTable).where(eq(bidInputTable.id, id));
            return result;
        } catch (e: any) {
            console.log("Error fetching bdInput by id", e.toString());
        }
    },
    ['bd_input'],
    {
        tags: ['bd_input'],
    }
)
