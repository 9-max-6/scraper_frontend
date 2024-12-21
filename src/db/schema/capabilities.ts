import * as t from 'drizzle-orm/pg-core';

export const competenceEnum = t.pgEnum("competence", ["0", "1", "2", "3", "4"])
export const countryExperienceEnum = t.pgEnum("countryExperience", ["0", "1", "2", "3", "4"])
export const clientsEnum = t.pgEnum("clients", ["0", "1", "2", "3", "4"])

export const capabilitiesTable = t.pgTable('capabilities', {
    id: t.serial().primaryKey(),
    competence: competenceEnum().default("0"),
    countryExperience: countryExperienceEnum().default("0"),
    clients: clientsEnum().default("0"),
})

export type InsertCapabilities = typeof capabilitiesTable.$inferInsert;
export type SelectCapabilities = typeof capabilitiesTable.$inferSelect;
