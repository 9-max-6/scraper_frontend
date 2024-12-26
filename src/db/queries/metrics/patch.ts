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
import { InsertBid } from "@/db/schema/bids";


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
export async function patchCompById(id: number, data: Partial<InsertCompetitiveness>, bid: number, score: number) {
    try {
        await db.transaction(async (trx) => {
            // patch capabilities.
            await trx.update(competitivenessTable).set(data).where(eq(competitivenessTable.id, id))
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
                    competitivenessScore: score,
                    capabilitiesScore: 0,
                }
                await trx.insert(scoresTable).values(result)
            } else {
                const { id, createdAt, ...withoutId } = currentScore[0]

                const scoreData = {
                    ...withoutId,
                    competitivenessScore: score
                }
                await trx.insert(scoresTable).values(scoreData)
            }

            revalidateTag("single-bid")
            revalidateTag("competitiveness")
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
export async function patchRiskById(id: number, data: Partial<InsertRisk>, bid: number, score: number) {
    try {
        await db.transaction(async (trx) => {
            // patch capabilities.
            await trx.update(riskTable).set(data).where(eq(riskTable.id, id))
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
                    riskScore: score,
                    commercialsScore: 0,
                    competitivenessScore: 0,
                    capabilitiesScore: 0,
                }
                await trx.insert(scoresTable).values(result)
            } else {
                const { id, createdAt, ...withoutId } = currentScore[0]

                const scoreData = {
                    ...withoutId,
                    riskScore: score
                }
                await trx.insert(scoresTable).values(scoreData)
            }

            revalidateTag("single-bid")
            revalidateTag("risks")
            revalidateTag("scores")

        })

    } catch (error: any) {
        console.error(error.toString())
        throw new Error("Error in transaction");
    }

}
/**
 * 
 * @param bid
 * @param partialScore 
 */
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

export async function patchCommData(
    bdInputObj: {
        data: {
            bidDirectorCapture: number;
            bidDirectorEoi: number;
            bidDirectorTender: number;
            bidManagerCapture: number;
            bidManagerEoi: number;
            bidManagerTender: number;
            technicalLeadCapture: number;
            technicalLeadEoi: number;
            technicalLeadTender: number;
            recLeadCapture: number;
            recLeadEoi: number;
            recLeadTender: number;
            proposalWriteCapture: number;
            proposalWriteEoi: number;
            proposalWriteTender: number;
            analystCapture: number;
            analystEoi: number;
            analystTender: number;
            reviewerCapture: number;
            reviewerEoi: number;
            reviewerTender: number;
            copyWriterCapture: number;
            copyWriterEoi: number;
            copyWriterTender: number;
            recruiterAdminCapture: number;
            recruiterAdminEoi: number;
            recruiterAdminTender: number;
            commLeadCapture: number;
            commLeadEoi: number;
            commLeadTender: number;
            pmCapture: number;
            pmEoi: number;
            pmTender: number;
            graphicDesCapture: number;
            graphicDesEoi: number;
            graphicDesTender: number;
            translatorCapture: number;
            translatorEoi: number;
            translatorTender: number;
        },
        id: number,
    },
    commDataObj: {
        data: {
            contractValue: number;
            expertLoe: number;
            projectDuration: number;
            bdInput: number;
            historicalNetMargin: number;
            futureRevenue: number;
        },
        id: number
    },
    partialBid: {
        data: {
            budget: number;
            duration: number;
        },
        id: number;
    },
    scoreData: {
        score: number,
        id: number,
    }
): Promise<boolean | undefined> {
    try {
        // transaction
        console.log("scoreData", scoreData)
        console.log("partialBid", partialBid)
        console.log("bdInputObj", bdInputObj)
        console.log("commDataObj", commDataObj)
        return true;
    } catch (error: any) {
        console.error("Error patching comms", error.toString())
    }
}
