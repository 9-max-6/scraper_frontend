import { patchCommercials, getCommercials } from "@/lib/bid-service";
import { CommercialsTabType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

interface RequestParams {
    params: {
        bidId: string;
    };
}


export async function GET(request: NextRequest, { params }: RequestParams) {

    try {
        // the issue is that params is undefined.
        const { bidId } = params;

        if (!bidId) {
            return new NextResponse(JSON.stringify({ error: 'Bid ID is required' }), { status: 400 });
        }
        const bid = await getCommercials(parseInt(bidId));
        if (bid) {
            return new NextResponse(JSON.stringify({ data: bid }), { status: 200 });
        } else {
            return new NextResponse(JSON.stringify({ error: 'Bid not found' }), { status: 404 });
        }
    } catch (error) {
        if (error instanceof TypeError) {
            return new NextResponse(JSON.stringify({ error: 'Bid ID is required' }), { status: 400 });
        }
        console.log(error);
        return new NextResponse(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}



export async function PATCH(req: Request, { params }: RequestParams) {
    const { bidId } = params;

    try {
        // Parse the incoming request body
        const body: CommercialsTabType = await req.json();

        // Call the backend service to update the opportunity
        const updatedBid = await patchCommercials(bidId, body);

        if (updatedBid) {
            return new NextResponse(JSON.stringify({ data: updatedBid }), { status: 200 });
        } else {
            return new NextResponse(JSON.stringify({ error: 'Opportunity not found' }), { status: 404 });
        }
    } catch (error) {
        // this was to solve an issue with the naming of the route
        if (error instanceof TypeError) {
            return new NextResponse(JSON.stringify({ error: 'Bid ID is required' }), { status: 400 });
        }
        console.error('Error updating opportunity:', error);
        return new NextResponse(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}


/**
 * When the user opens the Commercials tab and exits, onExit() tries postUpdates() even when there are no changes
 * that have been made.
 * When the user loads up the bid page for the first time, the page is unable to fetch the bids.
 * When there are changes that have been made to the commercials object, the call to the backend
 * fails with error code 500. 
 */