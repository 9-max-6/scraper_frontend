import * as t from 'drizzle-orm/pg-core';
import { riskTable } from './risk';
import { competitivenessTable } from './competitiveness';
import { capabilitiesTable } from './capabilities';
import { commercialsTable } from './commercials';

export const metricsTable = t.pgTable('metrics', {
    id: t.serial("id").primaryKey().notNull(),
    riskId: t.integer('riskId').references(() => riskTable.id).unique(),
    competitivenessId: t.integer('competitivenessId').references(() => competitivenessTable.id).unique(),
    capabilitiesId: t.integer('capabilitiesId').references(() => capabilitiesTable.id).unique(),
    commercialsId: t.integer('commercialsId').references(() => commercialsTable.id).unique(),
})

export type InsertMetric = typeof metricsTable.$inferInsert
export type SelectMetric = typeof metricsTable.$inferSelect
