import { db } from "@/db";
import { metricsTable } from "@/db/schema/metrics";
import { eq, desc } from "drizzle-orm";
import { capabilitiesTable } from "@/db/schema/capabilities";
import { commercialsTable } from "@/db/schema/commercials";
import { riskTable } from "@/db/schema/risk";
import { competitivenessTable } from "@/db/schema/competitiveness";
import { scoresTable } from "@/db/schema/scores";
import { insertScore } from "../insert";

export const getMetricsById =
    async (id: number) => {
        try {
            const result = await db.select().from(metricsTable).where(eq(metricsTable.id, id));
            return result;
        } catch (e: any) {
            console.log("Error fetching metric by id", e.toString());
        }
    }

export const getCapabilitiesById =
    async (id: number) => {
        try {
            const result = await db.select().from(capabilitiesTable).where(eq(capabilitiesTable.id, id));
            // logging database fetch
            console.log("Fetching capability from the database.")
            return result;
        } catch (e: any) {
            console.log("Error fetching capability by id", e.toString());
        }
    }

export const getCommercialsById =
    async (id: number) => {
        try {
            const result = await db.select().from(commercialsTable).where(eq(commercialsTable.id, id));
            return result;
        }
        catch (e: any) {
            console.log("Error fetching commercial by id", e.toString());
        }
    }

export const getRiskById =
    async (id: number) => {
        try {
            const result = await db.select().from(riskTable).where(eq(riskTable.id, id));
            return result;
        }
        catch (e: any) {
            console.log("Error fetching risk by id", e.toString());
        }
    }

export const getCompetitivenessById =
    async (id: number) => {
        try {
            const result = await db.select().from(competitivenessTable).where(eq(competitivenessTable.id, id));
            return result;
        }
        catch (e: any) {
            console.log("Error fetching commercial by id", e.toString());
        }
    }

export const getScoresByBidId =
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
                const scoreId = await insertScore(defaultScores);
                if (!scoreId) {
                    console.log("Error inserting default scores");
                }
                return [defaultScores];
            }
            return result;
        }
        catch (e: any) {
            console.log("Error fetching scores by id", e.toString());
        }
    }