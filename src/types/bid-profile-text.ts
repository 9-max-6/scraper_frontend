import process from "process"

export const BidProfileText = {
    Capabilities: [
        {
            name: "Competence (Lead Sector)",
            tag: 'competence',
            levels: [
                {
                    label:"Limited track record and limited availability of experienced in-house technical resources.",
                    value: 0
                },
                {
                    label: "< 5 somewhat relevant references implemented in the past 5 years and limited availability of experienced in-house technical resources.",
                    value: 1
                },
                {
                    label: "5 <> 10 relevant references and somewhat availability of experienced in-house technical resources.",
                    value: 2
                },
                {
                    label: "> 10 strong relevant references and unconfirmed availability of experienced in-house technical resources.",
                    value: 3,
                },
                {
                    label: "> 10 very strong relevant references and confirmed availability of experienced in-house technical resources.",
                    value: 4,
                },
            ],
            weight: 9,
        },
        {
            name: "Country / Regional experience",
            tag: 'country',
            levels: [
                {
                    label: "No country/ regional track record in the past 5 years",
                    value: 0
                },
                {
                    label: "Limited country/ regional track record in past 5 years (2-3 references)",
                    value: 1
                },
                {
                    label: "Medium country/ regional track record in the past 5 years (2-3 references)",
                    value: 2
                },
                {
                    label: "High country/ regional track record in the past 5 years. (Existing registration and >5 references)",
                    value: 3
                },
                {
                    label: "Very High country/ regional track record in the past 5 years (Existing office and >5 references)",
                    value: 4
                },
            ],
            weight: 8
        },
        {
            name: "Clients",
            tag: 'clients',
            levels: [
                {
                    label: "Risky (Unreliable, DT Global has had negative experience with client)",
                    value: 0
                },
                {
                    label: "Unknowns (Possibly reliable although unknown/ new to DT Global)",
                    value: 1
                },
                {
                    label: "Frontier (Reliable, known to a limited extent, warm pursuit)",
                    value: 2
                },
                {
                    label: "Emerging (Reliable, known to an extent, hot pursuit)",
                    value: 3
                },
                {
                    label: "Developed (Reliable, well known to us, hot pursuit)",
                    value: 4
                }

            ],
            weight: 8
        }
    ],
    Competitiveness:  [
        {
            name: "Number of Bidders",
            tag: 'number',
            levels: [
                { label: "Very high number of competitive bidders > 8 bids", value: 0 },
                { label: "High number of competitive bidders (6-8 short-listed bidders)", value: 1 },
                { label: "Medium number of competitive bidders - (4-5 short-listed bidders)", value: 2 },
                { label: "Low number of competitive bidders - (2-3 short-listed bidders)", value: 3 },
                { label: "Sole sourced (DT Global is the only bidder)", value: 4 }
            ],
            weight: 5
        },
        {
            name: "Competitor profile for such bids",
            tag: 'competitor',
            levels: [
                { label: "Competitor has strong technical and financial competition and high likelihood of price dumping from competitors", value: 0 },
                { label: "Strong technical and financial competition but low likelihood of price dumping from competitors", value: 1 },
                { label: "Low technical and financial competition OR low likelihood of price dumping from competitors", value: 2 }
            ],
            weight: 7
        },
        {
            name: "Partner Capacity",
            tag: 'partner',
            levels: [
                { label: "Partner(s) is/are not yet secured but is necessary to meet the requirements", value: 0 },
                { label: "Lack of clarity if a partner(s) is required", value: 1 },
                { label: "Partner(s) is/are secured that meets our expectations in terms of brand, references, experience, skills", value: 2 },
                { label: "Partner(s) is/are secured with exceptional brand, references, experience, skills", value: 3 },
                { label: "DT Global does not require partner(s) OR first choice partner(s) is secured (has a similar project in same sector, and/or in the same country, and/or with the same client - and the client is happy)", value: 4 }
            ],
            weight: 4
        },
        {
            name: "Client Preference",
            tag: 'preference',
            levels: [
                { label: "Client favours the competitor who is a clear leader (likes the incumbent) OR has a negative view towards DT Global or its consortium", value: 0 },
                { label: "We are in the dark if the client has favourites", value: 1 },
                { label: "Client has no supplier preference and has no bias view towards DT Global or its consortium", value: 2 },
                { label: "Client favours DT Global", value: 3 }
            ],
            weight: 5
        },
        {
            name: "Client Intelligence",
            tag: 'intelligence',
            levels: [
                { label: "DT Global lacks intelligence and is late in the bid process whilst the competitor clearly has intelligence and is active in the bid process", value: 0 },
                { label: "DT Global lacks intelligence, is late in the bid process, but so does the competition", value: 1 },
                { label: "DT Global lacks intelligence but has significant time to gather intelligence and position itself", value: 2 },
                { label: "DT Global has a bit of intelligence and is early in the bid process", value: 3 },
                { label: "DT Global has strong prior intelligence and is early in the bid process", value: 4 }
            ],
            weight: 3
        },
        {
            name: "Client Procurement",
            tag: 'procurement',
            levels: [
                { label: "Low likelihood that the procurement process is transparent and/or fair, no knowledge of decision makers, may or may not have a mechanism for appeal", value: 0 },
                { label: "Lack of understanding of how the procurement process will be executed", value: 1 },
                { label: "Medium likelihood that the procurement process is transparent and/or fair, some knowledge of decision makers, mechanisms exists for appeal", value: 2 },
                { label: "High likelihood that the procurement process is transparent and/or fair, some knowledge of decision makers, mechanisms exists for appeal", value: 3 }
            ],
            weight: 4
        },
        {
            name: "Availability of resources",
            tag: 'availability',
            levels: [
                { label: "Lack in-house technical resources with proven experiences in similar bids", value: 0 },
                { label: "Have in-house technical resources with proven experiences in similar bids, but are not available, and we lack access to strong external resources that have developed similar bids", value: 1 },
                { label: "Have strong in-house technical resources with proven experiences in similar bids, are available, and we have access to strong external resources to complement the bid team", value: 2 }
            ],
            weight: 8
        }
    ],
    Commercials: [
        {
            name: "Contract Value ($)",
            tag: 'contract',
            levels: [
                { label: "Unknown", value: 0 },
                { label: "< $0.5M", value: 1 },
                { label: "$0.5 - $1.5M", value: 2 },
                { label: "$1.5M - $5M", value: 3 },
                { label: "$5 - 10M", value: 4 },
                { label: ">$10M", value: 5 }
            ],
            weight: 6
        },
        {
            name: "Expert LoE",
            tag: 'expert',
            levels: [
                { label: "Unknown", value: 0 },
                { label: "<350 days", value: 1 },
                { label: "350 - 1,000 days", value: 2 },
                { label: "1,000 - 2,500 days", value: 3 },
                { label: "2,500 - 5,500 days", value: 4 },
                { label: ">5,500 days", value: 5 }
            ],
            weight: 8
        },
        {
            name: "Project duration",
            tag: 'project',
            levels: [
                { label: "Unknown", value: 0 },
                { label: "<6 months", value: 1 },
                { label: "6 - 12 months", value: 2 },
                { label: "12 - 24 months", value: 3 },
                { label: "24 - 48 months", value: 4 },
                { label: ">48 months", value: 5 }
            ],
            weight: 5
        },
        {
            name: "BD input ($)",
            tag: 'bd',
            levels: [
                { label: "Unknown", value: 0 },
                { label: "<35 days", value: 1 },
                { label: "35 - 55 days", value: 2 },
                { label: "55 - 100 days", value: 3 },
                { label: "100 - 150 days", value: 4 },
                { label: ">150 days", value: 5 }
            ],
            weight: 4
        },
        {
            name: "Historical Net Margin (%)",
            tag: 'historical',
            levels: [
                { label: "Unknown", value: 0 },
                { label: "< 15%", value: 1 },
                { label: "15-20%", value: 2 },
                { label: "21-25%", value: 3 },
                { label: "25-30%", value: 4 },
                { label: "> 30%", value: 5 }
            ],
            weight: 5
        },
        {
            name: "Future Revenue",
            tag: 'future',
            levels: [
                { label: "No idea OR 0% chance of extension or future business", value: 0 },
                { label: "Rumour from reliable sources of a possible cost extension OR follow up phase", value: 1 },
                { label: "100% chance of cost extension OR follow up phase", value: 2 }
            ],
            weight: 6
        }
    ],
    Risk: [
        {
            name: "Scope of Work",
            tag: 'scopeOfWork',
            levels: [
                { label: "Project scope is unclear and expectations on deliverables are unclear", value: 0 },
                { label: "Project scope is clear but expectations on deliverables are not realistic", value: 1 },
                { label: "Project scope is clear and expectations on deliverables are realistic", value: 2 }
            ],
            weight: 8
        },
        {
            name: "Ease of Doing Business",
            tag: 'easeOfDoingBusiness',
            levels: [
                { label: "We don't know if the client is difficult to work with OR the client is extremely difficult to work with", value: 0 },
                { label: "Whilst the client is difficult to work with, we can still work with them", value: 1 },
                { label: "Client is easy to work with based on previous experience, BUT has challenges with report approval and/or payment processes", value: 2 },
                { label: "Client is easy to work with based on previous experience, and has reasonable report approval and/or payment processes", value: 3 }
            ],
            weight: 5
        },
        {
            name: "Security",
            tag: 'security',
            levels: [
                { label: "Country classified as Risk Level - 'Critical'", value: 0 },
                { label: "Country classified as Risk Level - 'High'", value: 1 },
                { label: "Country classified as Risk Level - 'Moderate'", value: 2 },
                { label: "Country classified as Risk Level - 'Low'", value: 3 }
            ],
            weight: 5
        },
        {
            name: "Reputational risk",
            tag: 'reputationalRisk',
            levels: [
                { label: "Project's reputational risks are considered high", value: 0 },
                { label: "Project's reputational risks are considered medium", value: 1 },
                { label: "Project's reputational risks are considered low", value: 2 }
            ],
            weight: 4
        }
    ],
}
