import { patchCommercials, getCommercials } from "@/lib/bid-service";

interface RequestParams {
    params: {
        bidId: string;
    };
}


export async function GET({ params }: RequestParams) {
    const { bidId } = params;

    if (!bidId) {
        return new Response(JSON.stringify({ error: 'Bid ID is required' }), { status: 400 });
    }

    try {
        const bid = await getCommercials(parseInt(bidId));
        if (bid) {
            return new Response(JSON.stringify({ data: bid }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Bid not found' }), { status: 404 });
        }
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}



export async function PATCH(req: Request, { params }: RequestParams) {
    const { bidId } = params;

    try {
        // Parse the incoming request body
        const body = await req.json();

        // Call the backend service to update the opportunity
        const updatedBid = await patchCommercials(bidId, body);

        if (updatedBid) {
            return new Response(JSON.stringify({ data: updatedBid }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Opportunity not found' }), { status: 404 });
        }
    } catch (error) {
        console.error('Error updating opportunity:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
