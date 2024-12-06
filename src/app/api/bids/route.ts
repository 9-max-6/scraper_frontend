import { BidDataType, BidType, CapabilitiesType, BidTypeArray, CommercialsType, CompetitivenessType, RiskType } from "@/types/types";

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
        console.log("Success:", responseData);

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
export async function GET(request: Request) {
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
        console.log("Fetched Opportunities:", responseData);
        const bidArray: BidTypeArray = []

        for (const responseItem of responseData) {
            const bid: BidType = {
                bidData: {
                    id: responseItem.id,
                    title: responseItem.title, // Title of the bid
                    phase: responseItem.phase, // Current phase of the bid
                    date: responseItem.date, // Date of the bid
                    author: responseItem.author, // Author of the bid
                    client: responseItem.client, // Client name
                    country: responseItem.country, // Country of operation
                    biddingEntity: responseItem.biddingEntity, // The entity placing the bid
                    technicalUnit: responseItem.technicalUnit, // Technical unit responsible
                    consortiumRole: responseItem.consortiumRole, // Role in the consortium
                    deadline: responseItem.deadline, // Deadline of the bid
                    des: responseItem.des, // Deadline of the bid
                },
                metrics: {
                    capabilities: {
                        competence: responseItem.competence,
                        country: responseItem.country_experience,
                        clients: responseItem.clients
                    } as CapabilitiesType,
                    competitiveness: {
                        number: responseItem.number_of_bidders, // Number of bidders
                        competitor: responseItem.competitor_profile, // Profile of competitors
                        partner: responseItem.partner_capacity, // Capacity of partners
                        preference: responseItem.client_preference, // Client preferences
                        intelligence: responseItem.client_intelligence, // Client intelligence level
                        procurement: responseItem.client_procurement, // Client's procurement process rating
                        availability: responseItem.availability_of_resources, // Availability of resources
                    } as CompetitivenessType,
                    commercials: {
                        contract: responseItem.contract_value, // Value of the contract
                        expert: responseItem.expert_loe, // Level of effort required by experts
                        project: responseItem.project_duration,// Duration of the project (e.g., in months)
                        bd: responseItem.bd_input, // Business development input
                        historicals: responseItem.historical_net_margin, // Historical net margin
                        future: responseItem.future_revenue, // Potential future revenue
                    } as CommercialsType,
                    risk: {
                        scope: responseItem.scope_of_work,
                        ease: responseItem.ease_of_doing_business,
                        security: responseItem.security,
                        reputational: responseItem.reputational_risk,
    
                    } as RiskType
                }
            };
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
