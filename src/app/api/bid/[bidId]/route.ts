import { getBidById } from '@/lib/bid-service'; // Example function to get a bid by ID

export async function GET(req, { params }) {
    const { bidId } = params;

    try {
        const bid = await getBidById(bidId);
        if (bid) {
            return new Response(JSON.stringify({ data: bid }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Bid not found' }), { status: 404 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
