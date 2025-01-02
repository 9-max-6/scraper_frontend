/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "..";
import { bidsTable, InsertBid } from "../schema/bids"
import { capabilitiesTable, } from "../schema/capabilities";
import { bidInputTable, commercialsTable } from "../schema/commercials";
import { competitivenessTable } from "../schema/competitiveness";
import { clientsTable, InsertClient } from "../schema/donors";
import { InsertMetric, metricsTable } from "../schema/metrics";
import { riskTable } from "../schema/risk";
import { scoresTable } from "../schema/scores";
import { revalidateTag } from "next/cache";


/**
 * 
 * @param data 
 * @returns 
 */
export async function insertBid(data: InsertBid): Promise<number | undefined> {
    try {
        /**
         *  make this one transaction
         * insert each metric then if the transaction is successful, 
         * we can proceed to now insert the metric itself and then the 
         * bid and finally the score.
         * */
        const bid = await db.transaction(async (trx) => {

            // inserting bdInput
            const [bdInputObj] = await trx.insert(bidInputTable).values({}).returning({ id: bidInputTable.id });

            // inserting metrics
            const [capId] = await trx.insert(capabilitiesTable).values({}).returning({ id: capabilitiesTable.id });
            const [commId] = await trx.insert(commercialsTable).values({ bdInputId: bdInputObj.id }).returning({ id: commercialsTable.id });
            const [compId] = await trx.insert(competitivenessTable).values({}).returning({ id: competitivenessTable.id });
            const [riskId] = await trx.insert(riskTable).values({}).returning({ id: riskTable.id });

            const metricData: InsertMetric = {
                capabilitiesId: capId.id,
                commercialsId: commId.id,
                competitivenessId: compId.id,
                riskId: riskId.id,
            }
            const [metricsId] = await trx.insert(metricsTable).values(metricData).returning({ id: metricsTable.id });
            // inserting bid
            const [bid] = await trx.insert(bidsTable).values({
                metrics: metricsId.id,
                ...data
            }).returning({ id: bidsTable.id })

            // inserting score
            trx.insert(scoresTable).values({
                bid: bid.id,
                overallScore: 0,
                capabilitiesScore: 0,
                competitivenessScore: 0,
                commercialsScore: 0,
                riskScore: 0
            })

            // end transaction
            return bid
        })
        // revalidate and return
        revalidateTag('bids')
        revalidateTag('bid_count')
        revalidateTag('overdue_bid_count')
        revalidateTag('healthy_bid')
        revalidateTag('top_scorer')
        revalidateTag('top_bid')
        return bid.id;
    } catch (error: any) {
        console.error("DB: insertBid: ", error.toString());
        // returning undefined
    }
}
/*
 * @param data 
 * @returns 
 */
export async function insertClient(data: InsertClient): Promise<number | undefined> {
    try {

        const [result] = await db.insert(clientsTable).values(data).returning({ id: clientsTable.id })
        return result.id;
    } catch (error) {
        console.log(error);
        // returning undefined.
    }
}
