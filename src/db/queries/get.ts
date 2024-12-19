import { db } from "..";
import { bidsTable, clients } from "../schema";

export async function getBids() {
    return db.select().from(bidsTable)
}

export async function getClients() {
    return db.select().from(clients)
}
