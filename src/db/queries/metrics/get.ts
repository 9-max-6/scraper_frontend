import { db } from "@/db";
import { metricsTable } from "@/db/schema/metrics";
import { unstable_cache } from "next/cache";
import { eq } from "drizzle-orm";
import { capabilitiesTable } from "@/db/schema/capabilities";
import { commercialsTable } from "@/db/schema/commercials";
import { riskTable } from "@/db/schema/risk";
import { competitivenessTable } from "@/db/schema/competitiveness";

export const getMetricsById = unstable_cache(
    async (id: number) => {
        try {
            const result = db.select().from(metricsTable).where(eq(metricsTable.id, id));
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
            const result = db.select().from(capabilitiesTable).where(eq(capabilitiesTable.id, id));
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
            const result = db.select().from(commercialsTable).where(eq(commercialsTable.id, id));
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
            const result = db.select().from(riskTable).where(eq(riskTable.id, id));
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
            const result = db.select().from(competitivenessTable).where(eq(competitivenessTable.id, id));
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