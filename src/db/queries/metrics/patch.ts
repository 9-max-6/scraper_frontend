/* eslint-disable-nextline @typescript-eslint/no-unused-vars */
import { capabilitiesTable, InsertCapabilities } from "@/db/schema/capabilities";
import { bidInputTable, commercialsTable, InsertBdInput, InsertCommercials } from "@/db/schema/commercials";
import { competitivenessTable, InsertCompetitiveness } from "@/db/schema/competitiveness";
import { clientsTable } from "@/db/schema/donors";
import { InsertRisk, riskTable } from "@/db/schema/risk";
import { InsertScore, scoresTable } from "@/db/schema/scores";
import { db } from "@/db";
import { eq, desc } from "drizzle-orm";
import { getScoresByBidId } from "./get";
import { revalidateTag } from "next/cache";


type GenericInsert = Partial<InsertCapabilities> |
    Partial<InsertCommercials> | Partial<InsertRisk> | Partial<InsertCompetitiveness>;

type GenericPatchTable = typeof capabilitiesTable | typeof clientsTable |
    typeof competitivenessTable | typeof bidInputTable | typeof scoresTable |
    typeof riskTable | typeof commercialsTable;

/**
 * 
 * @param id 
 * @param data 
 * @param genericTable 
 */
export async function genericPatchById(
    id: number,
    data: GenericInsert,
    genericTable: GenericPatchTable) {
    try {
        await db.update(genericTable).set(data).where(eq(genericTable.id, id))
    } catch (error: any) {
        console.log(error.toString())
        throw new Error("Error patching bid")
    }
}

/**
 * 
 * @param id 
 * @param data 
 * @returns 
 */
export async function patchCapById(id: number, data: Partial<InsertCapabilities>, bid: number, score: number) {
    try {
        await db.transaction(async (trx) => {
            // patch capabilities.
            await trx.update(capabilitiesTable).set(data).where(eq(capabilitiesTable.id, id))
            // updating scores for capabilties for this id.
            const currentScore = await trx
                .select()
                .from(scoresTable)
                .where(eq(scoresTable.bid, bid))
                .orderBy(desc(scoresTable.createdAt))

            if (currentScore.length === 0) {
                // adding default values
                const result = {
                    bid: bid,
                    overallScore: 0,
                    riskScore: 0,
                    commercialsScore: 0,
                    competitivenessScore: 0,
                    capabilitiesScore: score
                }
                await trx.insert(scoresTable).values(result)
            } else {
                const { id, createdAt, ...withoutId } = currentScore[0]

                const scoreData = {
                    ...withoutId,
                    capabilitiesScore: score
                }
                await trx.insert(scoresTable).values(scoreData)
            }

            revalidateTag("single-bid")
            revalidateTag("capabilities")
            revalidateTag("scores")

        })

    } catch (error: any) {
        console.error(error.toString())
        throw new Error("Error in transaction");
    }

}

/**
 * 
 * @param id 
 * @param data 
 * @returns 
 */
export async function patchCommById(id: number, data: Partial<InsertCommercials>) {
    const result = await genericPatchById(id, data, commercialsTable);
    // revalidateTag("commercials")
    return result;
}

/**
 * 
 * @param id 
 * @param data 
 * @returns 
 */
export async function patchCompById(id: number, data: Partial<InsertCompetitiveness>) {
    const result = await genericPatchById(id, data, competitivenessTable);
    // revalidateTag("competitiveness")
    return result;
}

/**
 * 
 * @param id 
 * @param data 
 * @returns 
 */
export async function patchRiskById(id: number, data: Partial<InsertRisk>) {
    const result = await genericPatchById(id, data, riskTable);
    // revalidateTag("risk")
    return result;
}

/**
 * 
 * @param id 
 * @param data 
 * @returns 
 */
export async function patchInputBdById(id: number, data: Partial<InsertBdInput>, score: {
    scoreType: string,
    value: number,
}
) {
    const result = await genericPatchById(id, data, bidInputTable)
    // revalidateTag("bidInput")
    return result;
}

export async function updateScores(
    bid: number,
    partialScore: Partial<InsertScore>
) {
    const currentScores = await getScoresByBidId(bid);
    const newData = {
        ...currentScores[0],
        ...partialScore
    }

    try {
        // inserting the new score
        await db.insert(scoresTable).values(newData);
    } catch (error: any) {
        console.log(error);

    }

}
