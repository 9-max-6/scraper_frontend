/* eslint-disable @typescript-eslint/no-explicit-any */

import { db } from "../../index"
import { bidsTable } from "../../schema/bids";
import { scoresTable } from "../../schema/scores";
import { eq, sql, lt, desc } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const getUrgentBidCount = unstable_cache(async () => {
    try {
        const result = await db
            .select({
                count: sql`COUNT(*)`.as("count"),
            })
            .from(bidsTable)
            .where(eq(bidsTable.urgent, true));
        return result[0].count;
    } catch (error: any) {
        console.error(error.toString())
    }
}, ["urgent_bid_count"], { tags: ["urgent_bid_count"] })



export const getOverDueBidsCount = unstable_cache(async () => {
    try {
        const result = await db
            .select({
                count: sql`COUNT(*)`.as("count"),
            })
            .from(bidsTable)
            .where(lt(bidsTable.deadline, new Date()));
        return result[0].count;
    } catch (error: any) {
        console.error(error.toString())
    }
}, ["overdue_bid_count"], { tags: ["overdue_bid_count"] })

/**
 * this is a really heavy function.
 * The math done here is basically to get all the bids and determine the ones
 * that are past their threshold.
 * 
 */
export const getHealthyBidsCount = unstable_cache(async () => {

    const captureThreshold = 60;
    const eoiThreshold = 265;
    const tenderThreshold = 335;


    let healthyBidsCount = 0;
    try {
        const bidArray = await db.select({ phase: bidsTable.phase, id: bidsTable.id }).from(bidsTable);
        for (const bid of bidArray) {

            // select scores
            const score = await db
                .select()
                .from(scoresTable)
                .where(eq(scoresTable.bid, bid.id))
                .orderBy(desc(scoresTable.createdAt))

            if (score && score[0]) {
                let threshold = 0;
                if (bid.phase === 'capture') {
                    threshold = captureThreshold;
                } else if (bid.phase === 'eoi') {
                    threshold = eoiThreshold;
                } else {
                    threshold = tenderThreshold;
                }
                // increment if the bid is late
                if (score[0].overallScore > threshold) {
                    healthyBidsCount = healthyBidsCount + 1;
                }
            }
        }
        return healthyBidsCount;

    } catch (error: any) {
        console.error("Unhealthy bids", error.toString())
    }
}, ["healthy_bid"], { tags: ["healthy_bid"] })


export const getTopScorer = unstable_cache(async () => {
    try {
        const rankedScores = await db
            .select({
                bid: scoresTable.bid,
                overallScore: scoresTable.overallScore,
                createdAt: scoresTable.createdAt,
                rank: sql`ROW_NUMBER() OVER (PARTITION BY ${scoresTable.bid} ORDER BY ${scoresTable.createdAt} DESC)`.as('rank')!,
            })
            .from(scoresTable);
        const topScore = {
            value: 0,
            id: 0,
        };
        for (const score of rankedScores) {
            if (!score.rank) {
                continue
            }
            if (score.rank === '1') {
                if (topScore.value < score.overallScore) {
                    console.log(topScore, score)
                    topScore.value = score.overallScore;
                    topScore.id = score.bid;
                }
            }
        }
        return topScore.id;
    } catch (error: any) {
        console.error(error.toString());
    }
}, ["top_scorer"], {
    tags: ["top_scorer"]
})
/**
 * 
 */
export const topBid = unstable_cache(async (id: number) => {
    try {
        const topBidScore = await db.select().from(scoresTable).where(eq(scoresTable.bid, id)).orderBy(desc(scoresTable.createdAt));
        const topBidData = await db.select().from(bidsTable).where(eq(bidsTable.id, topBidScore[0].bid))

        return {
            topBidScore,
            topBidData
        }
    } catch (error: any) {
        console.error(error.toString())
    }
}, ["top_bid"], { tags: ["top_bid"] })

