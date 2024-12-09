import { BidType, BackendBidType } from "@/types/types";

const API_URL = "http://localhost:8000/profiler"; // Replace with your backend API URL


export async function updateBidById(bidId: string, updateData: BidType) {
    const formattedBid = formatForBackend(updateData)

    const response = await fetch(`${API_URL}/${bidId}/`, {
        method: 'PATCH', // Use PATCH for partial updates
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedBid),
    });

    if (!response.ok) {
        throw new Error(`Failed to update opportunity: ${response.statusText}`);
    }

    return response.json(); // Return the updated opportunity
}

export async function getBidById(bidId: number) {

    try {
        const response = await fetch(`${API_URL}/${bidId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch bid: ${response.statusText}`);
        }

        const bid = await response.json()
        return formatForFrontend(bid);
    } catch (error) {
        console.error('Error fetching bid:', error);
        throw error;
    }
}

export function formatForBackend(bid: BidType): BackendBidType {
    return {
        id: bid.bidData.id,
        title: bid.bidData.title,
        phase: bid.bidData.phase,
        date: bid.bidData.date,
        author: bid.bidData.author,
        client: bid.bidData.client,
        country: bid.bidData.country,
        biddingEntity: bid.bidData.biddingEntity,
        technicalUnit: bid.bidData.technicalUnit,
        consortiumRole: bid.bidData.consortiumRole,
        deadline: bid.bidData.deadline,
        des: bid.bidData.des,
        competence: bid.metrics.capabilities.competence,
        country_experience: bid.metrics.capabilities.country,
        clients: bid.metrics.capabilities.clients,
        number_of_bidders: bid.metrics.competitiveness.number,
        competitor_profile: bid.metrics.competitiveness.competitor,
        partner_capacity: bid.metrics.competitiveness.partner,
        client_preference: bid.metrics.competitiveness.preference,
        client_intelligence: bid.metrics.competitiveness.intelligence,
        client_procurement: bid.metrics.competitiveness.procurement,
        availability_of_resources: bid.metrics.competitiveness.availability,
        contract_value: bid.metrics.commercials.contract,
        expert_loe: bid.metrics.commercials.expert,
        project_duration: bid.metrics.commercials.project,
        bd_input: bid.metrics.commercials.bd,
        historical_net_margin: bid.metrics.commercials.historicals,
        future_revenue: bid.metrics.commercials.future,
        scope_of_work: bid.metrics.risk.scope,
        ease_of_doing_business: bid.metrics.risk.ease,
        security: bid.metrics.risk.security,
        reputational_risk: bid.metrics.risk.reputational,
    };
}

export function formatForFrontend(responseItem: BackendBidType): BidType {
    return {
        bidData: {
            id: responseItem.id,
            title: responseItem.title,
            phase: responseItem.phase,
            date: responseItem.date,
            author: responseItem.author,
            client: responseItem.client,
            country: responseItem.country,
            biddingEntity: responseItem.biddingEntity,
            technicalUnit: responseItem.technicalUnit,
            consortiumRole: responseItem.consortiumRole,
            deadline: responseItem.deadline,
            des: responseItem.des,
        },
        metrics: {
            capabilities: {
                competence: responseItem.competence,
                country: responseItem.country_experience,
                clients: responseItem.clients,
            },
            competitiveness: {
                number: responseItem.number_of_bidders,
                competitor: responseItem.competitor_profile,
                partner: responseItem.partner_capacity,
                preference: responseItem.client_preference,
                intelligence: responseItem.client_intelligence,
                procurement: responseItem.client_procurement,
                availability: responseItem.availability_of_resources,
            },
            commercials: {
                contract: responseItem.contract_value,
                expert: responseItem.expert_loe,
                project: responseItem.project_duration,
                bd: responseItem.bd_input,
                historicals: responseItem.historical_net_margin,
                future: responseItem.future_revenue,
            },
            risk: {
                scope: responseItem.scope_of_work,
                ease: responseItem.ease_of_doing_business,
                security: responseItem.security,
                reputational: responseItem.reputational_risk,
            },
        },
    };
}

  