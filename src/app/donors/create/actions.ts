'use server'
import { z } from "zod";
import { FormSchema } from "./_components/new-client-form";
/**
 * mutation function imports
 */
import { insertClient } from "@/db/queries/insert";

/**
 * 
 * @param data 
 * @returns 
 */
export async function postClient(data: z.infer<typeof FormSchema>): Promise<number | undefined> {

    const id = await insertClient(
        {
            name: data.name,
            des: data.des
        }
    );
    if (!id) {
        return undefined;
    }

    return id;
}


export async function undoClient(id: number | undefined): Promise<number | undefined> {
    if (!id) {
        return undefined;
    }
    console.log('undoClient', id);
    return id;
}