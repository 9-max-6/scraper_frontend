'use server'
import { z } from "zod";
import { FormSchema } from "./_components/new-bid-form";
/**
 * mutation function imports
 */
import { insertBid } from "@/db/queries/insert";
/**
 * reformat function imports
 */
import { reformatBid } from "@/lib/bid-service";

/**
 * 
 * @param data 
 * @returns 
 */
export async function postBid(data: z.infer<typeof FormSchema>): Promise<number | undefined> {
    const reformattedBid = reformatBid(data);
    if (!reformattedBid) {
        return undefined;
    }
    const id = await insertBid(reformattedBid);
    if (!id) {
        return undefined;
    }
    return id;
}


export async function undoBid(id: number | undefined): Promise<number | undefined> {
    if (!id) {
        return undefined;
    }
    return id;
}