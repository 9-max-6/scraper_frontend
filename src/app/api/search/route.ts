import axios from "axios";

export async function GET(): Promise<Response> {
    try {
        // Make the API request
        const response = await axios.get("http://localhost:8000/profiler/custom-search");
        // Log and return only the data part of the response
        return new Response(
            JSON.stringify({ message: "Data successfully fetched", data: response.data }), 
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (e) {
        console.error("Error fetching data", e);

        // Return an error response
        return new Response(
            JSON.stringify({ error: "Failed to fetch data", details: e.message }), 
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}