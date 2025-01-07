import {
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core'

export const clientsTable = pgTable("clientsTable", {
    id: serial("id").primaryKey(),
    name: varchar("title", { length: 255 }).notNull(),
    des: text("des").notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    deletedAt: timestamp(),
    updatedAt: timestamp(),
})

export type InsertClient = typeof clientsTable.$inferInsert
export type SelectClient = typeof clientsTable.$inferSelect
