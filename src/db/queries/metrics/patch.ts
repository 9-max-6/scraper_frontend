/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { capabilitiesTable, InsertCapabilities } from "@/db/schema/capabilities";
import { bidInputTable, commercialsTable, InsertCommercials } from "@/db/schema/commercials";
import { competitivenessTable, InsertCompetitiveness } from "@/db/schema/competitiveness";
import { clientsTable } from "@/db/schema/donors";
import { InsertRisk, riskTable } from "@/db/schema/risk";
import { InsertScore, scoresTable } from "@/db/schema/scores";
import { db } from "@/db";
import { eq, desc } from "drizzle-orm";
import { getScoresByBidId } from "./get";
import { revalidateTag } from "next/cache";
import { bidsTable, BidUpdate } from "@/db/schema/bids";


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
                    overallScore: score,
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
                    overallScore: score + withoutId.commercialsScore + withoutId.competitivenessScore + withoutId.riskScore,
                    capabilitiesScore: score,
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
                    overallScore: score,
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
                    overallScore: withoutId.capabilitiesScore + withoutId.commercialsScore + score + withoutId.riskScore,
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
            await trx.update(riskTable).set(data).where(eq(riskTable.id, id))
            const currentScore = await trx
                .select()
                .from(scoresTable)
                .where(eq(scoresTable.bid, bid))
                .orderBy(desc(scoresTable.createdAt))

            if (currentScore.length === 0) {
                // adding default values
                const result = {
                    bid: bid,
                    overallScore: score,
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
                    overallScore: withoutId.capabilitiesScore + withoutId.commercialsScore + withoutId.competitivenessScore + score,
                    riskScore: score
                }
                await trx.insert(scoresTable).values(scoreData)
            }

            revalidateTag("single-bid")
            revalidateTag("risks")
            revalidateTag("scores")
            revalidateTag('overdue_bid_count')
            revalidateTag('healthy_bid')
            revalidateTag('top_scorer')
            revalidateTag('top_bid')

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

        const updatedAt = new Date();

        await db.transaction(async (trx) => {
            // update bidInputTable
            await trx.update(bidInputTable).set({
                ...bdInputObj.data,
                updatedAt: updatedAt
            }).where(eq(bidInputTable.id, bdInputObj.id))

            // update bidData
            await trx.update(bidsTable).set({
                ...partialBid.data,
                updatedAt: updatedAt
            } as BidUpdate).where(eq(bidsTable.id, partialBid.id))

            // updated commData
            await trx.update(commercialsTable).set({
                ...commDataObj.data,
                updatedAt
            }).where(eq(commercialsTable.id, commDataObj.id))

            // updated Scores
            const currentScore = await trx
                .select()
                .from(scoresTable)
                .where(eq(scoresTable.bid, partialBid.id))
                .orderBy(desc(scoresTable.createdAt))

            if (currentScore.length === 0) {
                // adding default values
                const result = {
                    bid: partialBid.id,
                    overallScore: scoreData.score,
                    riskScore: 0,
                    competitivenessScore: 0,
                    commercialsScore: scoreData.score,
                    capabilitiesScore: 0,
                }
                await trx.insert(scoresTable).values(result)
            } else {
                const { id, createdAt, ...withoutId } = currentScore[0]

                const mutatedScoreData = {
                    ...withoutId,
                    overallScore: withoutId.capabilitiesScore + withoutId.commercialsScore + withoutId.competitivenessScore + withoutId.riskScore,
                    commercialsScore: scoreData.score
                }
                await trx.insert(scoresTable).values(mutatedScoreData)
            }
        })
        revalidateTag("single-bid")
        revalidateTag("commercials")
        revalidateTag("scores")
        revalidateTag("bd_input")
        revalidateTag('overdue_bid_count')
        revalidateTag('healthy_bid')
        revalidateTag('top_scorer')
        revalidateTag('top_bid')
        return true;

    } catch (error: any) {
        console.error("Error patching comms", error.toString())
    }
}
