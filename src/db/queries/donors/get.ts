/* eslint-disable @typescript-eslint/no-explicit-any */

import { db } from "../../";
import { clientsTable } from "../../schema/donors";
import { ilike, desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

const PAGE_SIZE = 10;
export interface PaginatedDonorResponseType {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    items: {
        id: number;
        name: string;
        des: string;
        createdAt: Date;
        deletedAt: Date | null;
        updatedAt: Date | null;
    }[];
    title: string;
}

/**
 * 
 * @param requestObject 
 * @returns 
 */
export const getClientsPaginated = unstable_cache(
    async (requestObject: {
        page: number,
        title: string,
    }): Promise<PaginatedDonorResponseType | undefined> => {

        /**
         * to paginate this, we need have a page limit of 10 per page,
         * and then we need to have a query string that will allow us to
         * get the page number and the page size.
         * we need to also give an object on every response that will have 
         * the total number of pages and the total number of items.
         */

        // testing cache

        try {
            const { title } = requestObject;
            const { page } = requestObject;

            const count = await db.$count(clientsTable, ilike(clientsTable.name, `%${title}%`));
            if (count < 0) {
                console.error("No donors found");
            }
            const items = await db
                .select()
                .from(clientsTable)
                .offset((page - 1) * PAGE_SIZE)
                .limit(10)
                .where(title ? ilike(clientsTable.name, `%${title}%`) : undefined)
                .orderBy(desc(clientsTable.createdAt));

            if (!items) {
                return undefined;
            }
            const paginatedResponse = {
                totalItems: count,
                totalPages: Math.ceil(count / PAGE_SIZE),
                currentPage: page,
                pageSize: PAGE_SIZE,
                items: items,
                title: title,
            }
            return paginatedResponse;
        } catch (e: any) {
            console.log("Pagination error", e.toString());
        }
    },
    ['clients'],
    {
        tags: ['clients'],
    })

export const getClients = unstable_cache(
    async () => {
        const result = await db.select().from(clientsTable).orderBy(desc(clientsTable.createdAt));
        if (!result) {
            return undefined;
        }
        return result;
    },
    ['clients'],
    {
        tags: ['clients'],
    }
)

/**
 * 
 * @param id 
 * @returns 
 */
export const getClientsById = unstable_cache(
    async (id: number) => {
        try {

            const result = await db.select().from(clientsTable).where(eq(clientsTable.id, id));
            return result;
        } catch (e: any) {
            console.log("Error fetching client by id", e.toString());
        }
    },
    ['clients'],
    {
        tags: ['clients'],
    })


