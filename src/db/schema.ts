import {
    pgTable,
    serial,
    timestamp,
    integer,
    varchar,
    pgEnum,
    boolean,
    bigint,
} from 'drizzle-orm/pg-core'

export const phasesEnum = pgEnum('phases', ["Capture stage", "Expression of Interest", "Tender stage"])

const genericFields = {
    id: serial("id").primaryKey(),
    // in the donors table, this represents the name
    title: varchar("title", { length: 255 }).notNull(),
    // 
    des: varchar("title", { length: 255 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    deletedAt: timestamp(),
    updatedAt: timestamp(),
}

export const bidsTable = pgTable("bids", {
    ...genericFields,
    deadline: timestamp(),
    phase: phasesEnum().default("Capture stage"),
    author: varchar('author', { length: 50 }).notNull(),
    client: integer('client').references(() => clients.id).notNull(),
    country: varchar('country', { length: 50 }).notNull(),
    biddingEntity: varchar('biddingEntity', { length: 50 }).notNull(),
    technicalUnit: varchar('technicalUnit', { length: 50 }).notNull(),
    consortiumRole: varchar('consortiumRole', { length: 50 }).notNull(),
    competence: integer('competence').notNull().default(0),
    countryExperience: integer('countryExperience').notNull().default(0),
    clients: integer('clients').notNull().default(0),
    numberOfBidders: integer('numberOfBidders').notNull().default(0),
    competitorProfile: integer('competitorProfile').notNull().default(0),
    partnerCapacity: integer('partnerCapacity').notNull().default(0),
    clientPreference: integer('clientPreference').notNull().default(0),
    clientIntelligence: integer('clientIntelligence').notNull().default(0),
    clientProcurement: integer('clientProcurement').notNull().default(0),
    availabilityOfResources: integer('availabilityOfResources').notNull().default(0),
    contractValue: integer('contractValue').notNull().default(0),
    expertLoe: integer('expertLoe').notNull().default(0),
    projectDuration: integer('projectDuration').notNull().default(0),
    bdInput: integer('bdInput').notNull().default(0),
    historicalNetMargin: integer('historicalNetMargin').notNull().default(0),
    futureRevenue: integer('futureRevenue').notNull().default(0),
    scopeOfWork: integer('scopeOfWork').notNull().default(0),
    easeOfDoingBusiness: integer('easeOfDoingBusiness').notNull().default(0),
    security: integer('security').notNull().default(0),
    reputationalRisk: integer('reputationalRisk').notNull().default(0),
    goCapture: boolean('goCapture').notNull().default(false),
    goEoi: boolean('goEoi').notNull().default(false),
    goTender: boolean('goTender').notNull().default(false),
    tentCapture: boolean('tentCapture').notNull().default(false),
    tentEoi: boolean('tentEoi').notNull().default(false),
    tentTender: boolean('tentTender').notNull().default(false),
    urgent: boolean('urgent').notNull().default(false),
    budget: bigint({ mode: 'number' }).notNull().default(0),
    duration: integer('duration').notNull().default(0),
    bidDirectorCapture: integer('bidDirectorCapture').notNull().default(0),
    bidDirectorEoi: integer('bidDirectorEoi').notNull().default(0),
    bidDirectorTender: integer('bidDirectorTender').notNull().default(0),
    bidManagerCapture: integer('bidManagerCapture').notNull().default(0),
    bidManagerEoi: integer('bidManagerEoi').notNull().default(0),
    bidManagerTender: integer('bidManagerTender').notNull().default(0),
    technicalLeadCapture: integer('technicalLeadCapture').notNull().default(0),
    technicalLeadEoi: integer('technicalLeadEoi').notNull().default(0),
    technicalLeadTender: integer('technicalLeadTender').notNull().default(0),
    recLeadCapture: integer('recLeadCapture').notNull().default(0),
    recLeadEoi: integer('recLeadEoi').notNull().default(0),
    recLeadTender: integer('recLeadTender').notNull().default(0),
    proposalWriteCapture: integer('proposalWriteCapture').notNull().default(0),
    proposalWriteEoi: integer('proposalWriteEoi').notNull().default(0),
    proposalWriteTender: integer('proposalWriteTender').notNull().default(0),
    analystCapture: integer('analystCapture').notNull().default(0),
    analystEoi: integer('analystEoi').notNull().default(0),
    analystTender: integer('analystTender').notNull().default(0),
    reviewerCapture: integer('reviewerCapture').notNull().default(0),
    reviewerEoi: integer('reviewerEoi').notNull().default(0),
    reviewerTender: integer('reviewerTender').notNull().default(0),
    copyWriterCapture: integer('copyWriterCapture').notNull().default(0),
    copyWriterEoi: integer('copyWriterEoi').notNull().default(0),
    copyWriterTender: integer('copyWriterTender').notNull().default(0),
    recruiterAdminCapture: integer('recruiterAdminCapture').notNull().default(0),
    recruiterAdminEoi: integer('recruiterAdminEoi').notNull().default(0),
    recruiterAdminTender: integer('recruiterAdminTender').notNull().default(0),
    commLeadCapture: integer('commLeadCapture').notNull().default(0),
    commLeadEoi: integer('commLeadEoi').notNull().default(0),
    commLeadTender: integer('commLeadTender').notNull().default(0),
    pmCapture: integer('pmCapture').notNull().default(0),
    pmEoi: integer('pmEoi').notNull().default(0),
    pmTender: integer('pmTender').notNull().default(0),
    graphicDesCapture: integer('graphicDesCapture').notNull().default(0),
    graphicDesEoi: integer('graphicDesEoi').notNull().default(0),
    graphicDesTender: integer('graphicDesTender').notNull().default(0),
    translatorCapture: integer('translatorCapture').notNull().default(0),
    translatorEoi: integer('translatorEoi').notNull().default(0),
    translatorTender: integer('translatorTender').notNull().default(0),
});

export const clients = pgTable("clients", {
    ...genericFields,
})


export type InsertBid = typeof bidsTable.$inferInsert
export type SelectBid = typeof bidsTable.$inferSelect

export type InsertClient = typeof clients.$inferInsert
export type SelectClient = typeof clients.$inferSelect
