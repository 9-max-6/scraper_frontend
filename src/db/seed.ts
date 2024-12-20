import { db } from ".";
import { bidsTable, clients } from "./schema";


const bidsSeed = [
    { title: "Urban Infrastructure Bid", des: "Urban development project in Nairobi", author: "John Doe", client: 1, country: "Kenya", biddingEntity: "Global Infra Ltd", technicalUnit: "Infrastructure", consortiumRole: "Lead" },
    { title: "Rural Electrification", des: "Electrification project in rural Uganda", author: "Jane Smith", client: 2, country: "Uganda", biddingEntity: "EnergySolutions", technicalUnit: "Energy", consortiumRole: "Partner" },
    { title: "School Construction", des: "Primary school building in Accra", author: "Mohammed Ali", client: 3, country: "Ghana", biddingEntity: "EduBuild Consortium", technicalUnit: "Education", consortiumRole: "Consultant" },
    { title: "Water Supply Expansion", des: "Improving water supply in Mombasa", author: "Alice Johnson", client: 4, country: "Kenya", biddingEntity: "WaterWorks", technicalUnit: "Water Management", consortiumRole: "Subcontractor" },
    { title: "Bridge Renovation", des: "Renovation of historical bridges in Cairo", author: "Samuel Peters", client: 5, country: "Egypt", biddingEntity: "ConstructCo", technicalUnit: "Civil Engineering", consortiumRole: "Lead" },
    { title: "Healthcare Improvement Program", des: "Upgrading rural clinics in Ethiopia", author: "Isabella Taylor", client: 6, country: "Ethiopia", biddingEntity: "HealthPlus Ventures", technicalUnit: "Healthcare", consortiumRole: "Lead" },
    { title: "Renewable Energy Plant", des: "Solar power plant installation in Morocco", author: "Michael Brown", client: 7, country: "Morocco", biddingEntity: "SolarTech", technicalUnit: "Renewables", consortiumRole: "Technical Advisor" },
    { title: "Smart City Development", des: "Smart city features in Lagos", author: "Chloe Wilson", client: 8, country: "Nigeria", biddingEntity: "UrbanTech", technicalUnit: "Urban Planning", consortiumRole: "Consultant" },
    { title: "Agricultural Modernization", des: "Modernizing farms in Tanzania", author: "Lucas Moore", client: 9, country: "Tanzania", biddingEntity: "AgriModernize", technicalUnit: "Agriculture", consortiumRole: "Partner" },
    { title: "Telecom Network Expansion", des: "Expanding mobile network in Algeria", author: "Emily Clark", client: 10, country: "Algeria", biddingEntity: "Telecom Expand", technicalUnit: "Telecommunications", consortiumRole: "Lead" },
    { title: "Highway Construction Project", des: "New highway in South Africa", author: "Oliver Martin", client: 11, country: "South Africa", biddingEntity: "RoadBuild", technicalUnit: "Transport", consortiumRole: "Technical Advisor" },
    { title: "Flood Defense System", des: "Flood prevention in Dhaka", author: "Amelia Lewis", client: 12, country: "Bangladesh", biddingEntity: "FloodGuard", technicalUnit: "Environmental Engineering", consortiumRole: "Consultant" },
    { title: "Urban Park Development", des: "Creating green spaces in Manila", author: "Noah Walker", client: 13, country: "Philippines", biddingEntity: "EcoSpaces", technicalUnit: "Environmental Planning", consortiumRole: "Lead" },
    { title: "Waste Management System", des: "Improving waste handling in Jakarta", author: "Sophia Hall", client: 14, country: "Indonesia", biddingEntity: "CleanCity", technicalUnit: "Waste Management", consortiumRole: "Technical Advisor" },
    { title: "Tourism Infrastructure Enhancement", des: "Tourist facility upgrades in Thailand", author: "Liam Young", client: 15, country: "Thailand", biddingEntity: "TourismBuild", technicalUnit: "Hospitality", consortiumRole: "Partner" },
    { title: "Public Safety Network", des: "Safety network development in Rio", author: "Charlotte Turner", client: 16, country: "Brazil", biddingEntity: "SafeCity", technicalUnit: "Public Safety", consortiumRole: "Lead" },
    { title: "Industrial Zone Expansion", des: "Industrial park expansion in Poland", author: "Ethan King", client: 17, country: "Poland", biddingEntity: "IndustExpand", technicalUnit: "Industrial Planning", consortiumRole: "Consultant" },
    { title: "Seaport Modernization", des: "Modernizing seaport facilities in Vietnam", author: "Ava Wright", client: 18, country: "Vietnam", biddingEntity: "PortModern", technicalUnit: "Maritime", consortiumRole: "Lead" },
    { title: "Airport Upgrade Project", des: "Airport capacity enhancement in Dubai", author: "William Scott", client: 19, country: "UAE", biddingEntity: "SkyBuild", technicalUnit: "Aviation", consortiumRole: "Technical Advisor" },
    { title: "Urban Transit System", des: "New urban transit lines in Toronto", author: "Mia Hill", client: 20, country: "Canada", biddingEntity: "TransitPlus", technicalUnit: "Public Transport", consortiumRole: "Lead" }
];

// Seed data for the 'clients' table
const clientsSeed = [
    { title: "Global Infra Ltd", des: "An international infrastructure development company." },
    { title: "EnergySolutions", des: "Focuses on renewable energy projects across Africa." },
    { title: "EduBuild Consortium", des: "Specializes in educational infrastructure in West Africa." },
    { title: "WaterWorks", des: "Provides water management and infrastructure services." },
    { title: "ConstructCo", des: "A leading construction company in North Africa." },
    { title: "HealthPlus Ventures", des: "Healthcare project development firm in East Africa." },
    { title: "SolarTech", des: "Develops solar energy solutions in North and Sub-Saharan Africa." },
    { title: "UrbanTech", des: "Urban planning and smart city solutions provider in Nigeria." },
    { title: "AgriModernize", des: "Agricultural development and modernization firm." },
    { title: "Telecom Expand", des: "Telecommunication infrastructure provider in North Africa." },
    { title: "RoadBuild", des: "Specializes in road and transport infrastructure in Southern Africa." },
    { title: "FloodGuard", des: "Environmental engineering firm focusing on flood prevention." },
    { title: "EcoSpaces", des: "Designs and implements sustainable urban green spaces." },
    { title: "CleanCity", des: "Waste management and recycling company in Southeast Asia." },
    { title: "TourismBuild", des: "Infrastructure development for the tourism sector." },
    { title: "SafeCity", des: "Public safety and security infrastructure development." },
    { title: "IndustExpand", des: "Industrial planning and development in Europe." },
    { title: "PortModern", des: "Seaport modernization and management company in Southeast Asia." },
    { title: "SkyBuild", des: "Specializes in aviation and airport infrastructure projects." },
    { title: "TransitPlus", des: "Public transportation systems developer in North America." }
];

async function seed() {
    // seeding clients table.
    await db.insert(clients).values(bidsSeed)

    // seeding bids table
    await db.insert(bidsTable).values(bidsSeed)
}

seed()
