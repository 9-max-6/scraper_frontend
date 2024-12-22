import { db } from "..";
import { bidsTable, InsertBid } from "../schema/bids"
import { capabilitiesTable, InsertCapabilities } from "../schema/capabilities";
import { bidInputTable, commercialsTable, InsertBdInput, InsertCommercials } from "../schema/commercials";
import { competitivenessTable, InsertCompetitiveness } from "../schema/competitiveness";
import { clientsTable, InsertClient } from "../schema/donors";
import { InsertMetric, metricsTable } from "../schema/metrics";
import { InsertRisk, riskTable } from "../schema/risk";
import { InsertScore } from "../schema/scores";
import { revalidateTag } from "next/cache";

/**
 * generic typing and function to make inserts for new rows in the respective
 * tables given the respective data
 */
type GenericInsert = InsertClient | InsertScore | InsertCapabilities |
    InsertCommercials | InsertRisk | InsertCompetitiveness;

type GenericInsertTable = typeof capabilitiesTable | typeof clientsTable |
    typeof competitivenessTable | typeof bidInputTable |
    typeof riskTable;
/**
 * 
 * @param data 
 * @param genericTable 
 * @returns 
 */
export async function genericInsert(data: GenericInsert, genericTable: GenericInsertTable): Promise<number | undefined> {
    try {
        const idArray = await db.insert(genericTable).values(data).returning({
            insertedId: genericTable.id
        })
        return idArray[0].insertedId;
    } catch (error: any) {
        console.error(`${genericTable}: `, error.toString())
        throw error;
    }
}

/**
 * 
 * @param data 
 * @returns 
 */
export async function insertBid(data: InsertBid): Promise<number | undefined> {
    try {
        const metricsId = await insertMetric();
        const nestedData: InsertBid = {
            metrics: metricsId,
            ...data
        }
        const result = await db.insert(bidsTable).values(nestedData).returning({ insertedId: bidsTable.id });
        const id = result[0].insertedId;


        /**
         * revalidate the bids tag
         */
        revalidateTag("bids");

        return id;

    } catch (error: any) {
        console.error("DB: insertBid: ", error.toString());
    }
}

export async function insertMetric(data: InsertMetric = {}): Promise<number | undefined> {
    try {
        const [riskId, competitivenessId, capabilitiesId, commercialsId] = await Promise.all(
            [insertRisk(), insertCompetitiveness(), insertCapabilities(), insertCommercials()]
        );
        const nestedData: InsertMetric = {
            riskId: riskId,
            competitivenessId: competitivenessId,
            capabilitiesId: capabilitiesId,
            commercialsId: commercialsId
        }
        const result = await db.insert(metricsTable).values(nestedData).returning({ insertBid: metricsTable.id });
        const id = result[0].insertBid;
        return id;

    } catch (error: any) {
        console.error("InsertMetric: ", error.toString());
        throw error;
    }
}

export async function insertCommercials(data: InsertCommercials = {}): Promise<number | undefined> {
    // generate id for bdInput with default values.
    try {
        const bdInputId = await insertBdInput();
        const nestedData: InsertCommercials = {
            bdInputId: bdInputId
        }
        // attempting to add commercials.
        const result = await db.insert(commercialsTable).values(nestedData).returning({
            insertBid: commercialsTable.id
        });
        const id = result[0].insertBid;
        return id;
    } catch (error: any) {
        console.error("Commercials:", error.toString());
        throw error;
    }
}
/**
 * 
 * @param data 
 * @returns 
 */
export async function insertClient(data: InsertClient): Promise<number | undefined> {
    const result = await genericInsert(data, clientsTable);
    return result;
}
/**
 * 
 * @param data 
 * @returns 
 */
export async function insertScore(data: InsertScore = {}): Promise<number | undefined> {
    const result = await genericInsert(data, clientsTable)
    return result;
}
/**
 * 
 * @param data 
 * @returns 
 */
export async function insertCapabilities(data: InsertCapabilities = {}): Promise<number | undefined> {
    const id = await genericInsert(data, capabilitiesTable)
    return id;
}
/**
 * 
 * @param data 
 * @returns 
 */
export async function insertBdInput(data: InsertBdInput = {}): Promise<number | undefined> {
    const id = await genericInsert(data, bidInputTable);
    return id;
}
/**
 * 
 * @param data 
 * @returns 
 */
export async function insertCompetitiveness(data: InsertCompetitiveness = {}): Promise<number | undefined> {
    const id = await genericInsert(data, competitivenessTable)
    return id;
}

/**
 * 
 * @param data 
 * @returns 
 */
export async function insertRisk(data: InsertRisk = {}): Promise<number | undefined> {
    const id = await genericInsert(data, riskTable);
    return id;
}