import * as t from 'drizzle-orm/pg-core';
import { clientsTable } from './donors';
import { metricsTable } from './metrics';

export const phasesEnum = t.pgEnum('phases', ["capture", "eoi", "tender"])
export const statusEnum = t.pgEnum('status', ["undec", "go_cap", "tent_eoi", "tent_cap", "go_eoi", "go_tender", "tent_tender"])

export const bidsTable = t.pgTable("bids", {
    id: t.serial("id").primaryKey(),
    title: t.varchar("title", { length: 255 }).notNull(),
    des: t.text("des").notNull(),
    createdAt: t.timestamp().defaultNow().notNull(),
    deletedAt: t.timestamp(),
    updatedAt: t.timestamp(),
    deadline: t.timestamp(),
    phase: phasesEnum().default("capture"),
    author: t.varchar('author', { length: 50 }).notNull(),
    client: t.integer('client').references(() => clientsTable.id).notNull(),
    country: t.varchar('country', { length: 50 }).notNull(),
    biddingEntity: t.varchar('biddingEntity', { length: 50 }).notNull(),
    technicalUnit: t.varchar('technicalUnit', { length: 50 }).notNull(),
    consortiumRole: t.varchar('consortiumRole', { length: 50 }).notNull(),
    urgent: t.boolean('urgent').notNull().default(false),
    budget: t.bigint({ mode: 'number' }).notNull().default(0),
    duration: t.integer('duration').notNull().default(0),
    status: statusEnum().default("undec"),

    // metrics - can be null
    metrics: t.integer('metrics').references(() => metricsTable.id).unique(),
});


export type InsertBid = typeof bidsTable.$inferInsert
export type SelectBid = typeof bidsTable.$inferSelect
