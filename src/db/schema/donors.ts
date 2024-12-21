import {
    pgTable,
    serial,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core'

export const clientsTable = pgTable("clientsTable", {
    id: serial("id").primaryKey(),
    name: varchar("title", { length: 255 }).notNull(),
    des: varchar("des", { length: 255 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    deletedAt: timestamp(),
    updatedAt: timestamp(),
})

export type InsertClient = typeof clientsTable.$inferInsert
export type SelectClient = typeof clientsTable.$inferSelect
