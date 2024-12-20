import * as t from 'drizzle-orm/pg-core';
const contractValueEnum = t.pgEnum("contractValue", ["0", "1", "2", "3", "4", "5"])
const expertLoeEnum = t.pgEnum("expertLoe", ["0", "1", "2", "3", "4", "5"])
const projectDurationEnum = t.pgEnum("projectDuration", ["0", "1", "2", "3", "4", "5"])
const bdInputEnum = t.pgEnum("bdInput", ["0", "1", "2", "3", "4", "5"])
const historicalNetMarginEnum = t.pgEnum("historicalNetMargin", ["0", "1", "2", "3", "4", "5"])
const futureRevenueEnum = t.pgEnum("futureRevenue", ["0", "3", "5"])


export const commercialsTable = t.pgTable('commercials', {
    id: t.serial().primaryKey(),
    contractValue: contractValueEnum().default("0"),
    expertLoe: expertLoeEnum().default("0"),
    projectDuration: projectDurationEnum().default("0"),
    bdInput: bdInputEnum().default("0"),
    historicalNetMargin: historicalNetMarginEnum().default("0"),
    futureRevenue: futureRevenueEnum().default("0"),

    // a one to one relationship with the bd_input table here.
    bdInputId: t.integer("bdInputId").references(() => bidInputTable.id)
})

export const bidInputTable = t.pgTable('bdinput', {
    id: t.serial().primaryKey(),
    bidDirectorCapture: t.integer('bidDirectorCapture').notNull().default(0),
    bidDirectorEoi: t.integer('bidDirectorEoi').notNull().default(0),
    bidDirectorTender: t.integer('bidDirectorTender').notNull().default(0),
    bidManagerCapture: t.integer('bidManagerCapture').notNull().default(0),
    bidManagerEoi: t.integer('bidManagerEoi').notNull().default(0),
    bidManagerTender: t.integer('bidManagerTender').notNull().default(0),
    technicalLeadCapture: t.integer('technicalLeadCapture').notNull().default(0),
    technicalLeadEoi: t.integer('technicalLeadEoi').notNull().default(0),
    technicalLeadTender: t.integer('technicalLeadTender').notNull().default(0),
    recLeadCapture: t.integer('recLeadCapture').notNull().default(0),
    recLeadEoi: t.integer('recLeadEoi').notNull().default(0),
    recLeadTender: t.integer('recLeadTender').notNull().default(0),
    proposalWriteCapture: t.integer('proposalWriteCapture').notNull().default(0),
    proposalWriteEoi: t.integer('proposalWriteEoi').notNull().default(0),
    proposalWriteTender: t.integer('proposalWriteTender').notNull().default(0),
    analystCapture: t.integer('analystCapture').notNull().default(0),
    analystEoi: t.integer('analystEoi').notNull().default(0),
    analystTender: t.integer('analystTender').notNull().default(0),
    reviewerCapture: t.integer('reviewerCapture').notNull().default(0),
    reviewerEoi: t.integer('reviewerEoi').notNull().default(0),
    reviewerTender: t.integer('reviewerTender').notNull().default(0),
    copyWriterCapture: t.integer('copyWriterCapture').notNull().default(0),
    copyWriterEoi: t.integer('copyWriterEoi').notNull().default(0),
    copyWriterTender: t.integer('copyWriterTender').notNull().default(0),
    recruiterAdminCapture: t.integer('recruiterAdminCapture').notNull().default(0),
    recruiterAdminEoi: t.integer('recruiterAdminEoi').notNull().default(0),
    recruiterAdminTender: t.integer('recruiterAdminTender').notNull().default(0),
    commLeadCapture: t.integer('commLeadCapture').notNull().default(0),
    commLeadEoi: t.integer('commLeadEoi').notNull().default(0),
    commLeadTender: t.integer('commLeadTender').notNull().default(0),
    pmCapture: t.integer('pmCapture').notNull().default(0),
    pmEoi: t.integer('pmEoi').notNull().default(0),
    pmTender: t.integer('pmTender').notNull().default(0),
    graphicDesCapture: t.integer('graphicDesCapture').notNull().default(0),
    graphicDesEoi: t.integer('graphicDesEoi').notNull().default(0),
    graphicDesTender: t.integer('graphicDesTender').notNull().default(0),
    translatorCapture: t.integer('translatorCapture').notNull().default(0),
    translatorEoi: t.integer('translatorEoi').notNull().default(0),
    translatorTender: t.integer('translatorTender').notNull().default(0),
})
