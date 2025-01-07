import * as t from 'drizzle-orm/pg-core';

export const scopeOfWorkEnum = t.pgEnum("scopeOfWork", ["0", "2", "3"]);
export const easeOfDoingBusinessEnum = t.pgEnum("easeOfDoingBusiness", ["0", "1", "2", "3"]);
export const securityEnum = t.pgEnum("security", ["0", "1", "2", "3"]);
export const reputationalRiskEnum = t.pgEnum("reputationalRisk", ["0", "1", "3"])

export const riskTable = t.pgTable('risk', {
    id: t.serial().primaryKey(),
    scopeOfWork: scopeOfWorkEnum().default("0").notNull(),
    easeOfDoingBusiness: easeOfDoingBusinessEnum().default("0"),
    security: securityEnum().default("0"),
    reputationalRisk: reputationalRiskEnum().default("0"),
    createdAt: t.timestamp().defaultNow().notNull(),
    updatedAt: t.timestamp(),

})

export type InsertRisk = typeof riskTable.$inferInsert;
export type SelectRisk = typeof riskTable.$inferSelect;
