import { db } from "../../";
import { bidsTable } from "../../schema/bids";
import { ilike, desc, eq } from "drizzle-orm";

const PAGE_SIZE = 10;
export interface PaginatedResponseType {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    items: {
        id: number;
        title: string;
        client: number;
        des: string;
        createdAt: Date;
        deletedAt: Date | null;
        updatedAt: Date | null;
        deadline: Date | null;
        author: string;
        urgent: boolean;
        status: string | null;
        country: string;
        phase: "capture" | "eoi" | "tender" | null;
        metrics: number | null;
    }[];
    title: string;
}

/**
 * 
 * @param requestObject 
 * @returns 
 */
export const getBids =
    async (requestObject: {
        page: number,
        title: string,
    }): Promise<PaginatedResponseType | undefined> => {

        /**
         * to paginate this, we need have a page limit of 10 per page,
         * and then we need to have a query string that will allow us to
         * get the page number and the page size.
         * we need to also give an object on every response that will have 
         * the total number of pages and the total number of items.
         */

        // testing cache
        console.log("Fetching bids from the database");


        try {
            const { title } = requestObject;
            const { page } = requestObject;

            const count = await db.$count(bidsTable, ilike(bidsTable.title, `%${title}%`));
            if (count < 0) {
                console.error("No bids found");
            }
            const items = await db
                .select()
                .from(bidsTable)
                .offset((page - 1) * PAGE_SIZE)
                .limit(10)
                .where(title ? ilike(bidsTable.title, `%${title}%`) : undefined)
                .orderBy(desc(bidsTable.createdAt));

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
    }

/**
 * 
 * @param id 
 * @returns 
 */
export const getBidById =
    async (id: number) => {
        try {

            const result = await db.select().from(bidsTable).where(eq(bidsTable.id, id));
            return result;
        } catch (e: any) {
            console.log("Error fetching client by id", e.toString());
        }
    }