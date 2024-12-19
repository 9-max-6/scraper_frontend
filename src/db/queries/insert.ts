import { db } from "..";
import { bidsTable, clients, InsertBid, InsertClient } from "../schema";

export async function insertBid(data: InsertBid) {
    try {
        await db.insert(bidsTable).values(data)
    } catch (error) {
        console.error(error)
    }
}

export async function insertClient(data: InsertClient) {
    try {
        await db.insert(clients).values(data)
    } catch (error) {
        console.error(error)
    }
}

// need to figure out better error handling for it.
