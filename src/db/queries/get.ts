import { db } from "..";
import { bidsTable } from "../schema/bids";
import { clientsTable } from "../schema/donors";
import { metricsTable } from "../schema/metrics";
import { capabilitiesTable } from "../schema/capabilities";
import { scoresTable } from "../schema/scores";


export async function getBids() {
    return db.select().from(bidsTable);
}

export async function getClients() {
    return db.select().from(clientsTable);
}
export async function getMetrics() {
    return db.select().from(metricsTable);
}

export async function getCapabilities() {
    return db.select().from(capabilitiesTable);
}

export async function getScores() {
    return db.select().from(scoresTable);
}
