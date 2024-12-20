import * as t from 'drizzle-orm/pg-core';

const scopeOfWorkEnum = t.pgEnum("scopeOfWork", ["0", "2", "3"]);
const easeOfDoingBusinessEnum = t.pgEnum("easeOfDoingBusiness", ["0", "1", "2", "3"]);
const securityEnum = t.pgEnum("security", ["0", "1", "2", "3"]);
const reputationalRiskEnum = t.pgEnum("reputationalRisk", ["0", "1", "3"])

export const riskTable = t.pgTable('risk', {
    id: t.serial().primaryKey(),
    scopeOfWork: scopeOfWorkEnum().default("0"),
    easeOfDoingBusiness: easeOfDoingBusinessEnum().default("0"),
    security: securityEnum().default("0"),
    reputationalRisk: reputationalRiskEnum().default("0"),
})
