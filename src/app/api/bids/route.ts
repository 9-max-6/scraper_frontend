import { formatForFrontend } from "@/lib/bid-service";
import { BidTypeArray } from "@/types/types";
export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();

        // API endpoint for the Django backend
        const backendUrl = "http://localhost:8000/profiler/"; // Replace with your actual backend URL

        // Make the POST request to the backend
        const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        // Check for successful response
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error from backend:", errorData);
            return new Response(JSON.stringify({ error: "Failed to post data to backend" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        const responseData = await response.json();

        return new Response(JSON.stringify({ message: "Data successfully posted", data: responseData }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in POST handler:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
export async function GET() {
    try {
        // API endpoint for the Django backend
        const backendUrl = "http://localhost:8000/profiler/"; // Replace with your actual backend URL

        // Make the GET request to the backend
        const response = await fetch(backendUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Check for successful response
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error from backend:", errorData);
            return new Response(JSON.stringify({ error: "Failed to fetch data from backend" }), {
                status: response.status,
                headers: { "Content-Type": "application/json" },
            });
        }

        const responseData = await response.json();
        const bidArray: BidTypeArray = []

        for (const responseItem of responseData) {
            const bid = formatForFrontend(responseItem)
            bidArray.push(bid)
        }

        

        return new Response(JSON.stringify({ message: "Data successfully fetched", data: bidArray }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in GET handler:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
