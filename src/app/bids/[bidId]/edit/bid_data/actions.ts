/* eslint-disable @typescript-eslint/no-unused-vars */

"use server"
import { z } from "zod"
import { dbPatchDataById } from "@/db/queries/bids/patch"
import { deleteBidById } from "@/db/queries/delete"

export async function patchBidDataById(data: z.infer<typeof FormSchema>, id: number): Promise<boolean | undefined> {
    // make a promise here that will resolve or reject
    const result = await dbPatchDataById(data, id);
    if (result) {
        return true;
    }
}

const FormSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters." }),
    des: z.string().min(100, { message: "Description must be at least 100 characters." }),
    phase: z.string().min(1, { message: "Phase is required." }),
    author: z.string().min(2, { message: "Author name must be at least 2 characters." }),
    country: z.string().min(2, { message: "Country must be at least 2 characters." }),
    biddingEntity: z.string().min(2, { message: "Bidding entity is required." }),
    technicalUnit: z.string().min(2, { message: "Technical unit is required." }),
    consortiumRole: z.string().min(2, { message: "Consortium role is required." }),
    deadline: z.string().min(1, { message: "Deadline is required." }),
});

export async function deleteBid(bidId: number) {
    const result = await deleteBidById(bidId);
}