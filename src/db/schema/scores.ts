import * as t from 'drizzle-orm/pg-core'
import { bidsTable } from './bids'

export const scoresTable = t.pgTable("scores", {
    id: t.serial("id").primaryKey().notNull(),
    bid: t.serial("bid").references(() => bidsTable.id).notNull(),
    overallScore: t.integer('overallScore').notNull().default(0),
    capabilitiesScore: t.integer('capabilitiesScore').notNull().default(0),
    competitivenessScore: t.integer('competitivenessScore').notNull().default(0),
    commercialsScore: t.integer('commercialsScore').notNull().default(0),
    riskScore: t.integer('riskScore').notNull().default(0),
})

export type InsertScore = typeof scoresTable.$inferInsert
export type SelectScore = typeof scoresTable.$inferSelect
