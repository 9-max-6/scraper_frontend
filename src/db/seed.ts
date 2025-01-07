import { db } from ".";
import { bidsTable } from "./schema/bids";
import { clientsTable } from "./schema/donors";


const bidsSeed = [
    {
        title: "Urban Infrastructure Bid", 
        des: "Urban development project in Nairobi", 
        author: "John Doe", 
        client: 1, 
        country: "Kenya", 
        biddingEntity: "Global Infra Ltd", 
        technicalUnit: "Infrastructure", 
        consortiumRole: "Lead",
        metrics: 1,
    },
    { 
        title: "Rural Electrification", 
        des: "Electrification project in rural Uganda", 
        author: "Jane Smith", 
        client: 2, 
        country: "Uganda", 
        biddingEntity: "EnergySolutions",
        technicalUnit: "Energy", 
        consortiumRole: "Partner",
        metrics:  2,
    },
    { 
        title: "School Construction",
        des: "Primary school building in Accra",
        author: "Mohammed Ali",
        client: 3, 
        country: "Ghana", 
        biddingEntity: "EduBuild Consortium",
        technicalUnit: "Education", 
        consortiumRole: "Consultant",
        metrics:  3,
    },
    { 
        title: "Water Supply Expansion",
        des: "Improving water supply in Mombasa",
        author: "Alice Johnson",
        client: 4, 
        country: "Kenya", 
        biddingEntity: "WaterWorks",
        technicalUnit: "Water Management", 
        consortiumRole: "Subcontractor",
        metrics:  4,
    },
    { 
        title: "Bridge Renovation",
        des: "Renovation of historical bridges in Cairo",
        author: "Samuel Peters",
        client: 5, 
        country: "Egypt", 
        biddingEntity: "ConstructCo",
        technicalUnit: "Civil Engineering", 
        consortiumRole: "Lead",
        metrics:  5,
    },
    { 
        title: "Healthcare Improvement Program",
        des: "Upgrading rural clinics in Ethiopia",
        author: "Isabella Taylor",
        client: 6, 
        country: "Ethiopia", 
        biddingEntity: "HealthPlus Ventures",
        technicalUnit: "Healthcare", 
        consortiumRole: "Lead",
        metrics: 6,
    },
    { 
        title: "Renewable Energy Plant",
        des: "Solar power plant installation in Morocco",
        author: "Michael Brown",
        client: 7, 
        country: "Morocco", 
        biddingEntity: "SolarTech",
        technicalUnit: "Renewables", 
        consortiumRole: "Technical Advisor",
        metrics: 7,
    },
    { 
        title: "Smart City Development",
        des: "Smart city features in Lagos",
        author: "Chloe Wilson",
        client: 8, 
        country: "Nigeria", 
        biddingEntity: "UrbanTech",
        technicalUnit: "Urban Planning", 
        consortiumRole: "Consultant",
        metrics: 8,
    },
    { 
        title: "Agricultural Modernization",
        des: "Modernizing farms in Tanzania",
        author: "Lucas Moore",
        client: 9, 
        country: "Tanzania", 
        biddingEntity: "AgriModernize",
        technicalUnit: "Agriculture", 
        consortiumRole: "Partner",
        metrics: 9,
    },
    { 
        title: "Telecom Network Expansion",
        des: "Expanding mobile network in Algeria",
        author: "Emily Clark",
        client: 10, 
        country: "Algeria", 
        biddingEntity: "Telecom Expand",
        technicalUnit: "Telecommunications", 
        consortiumRole: "Lead",
        metrics: 10,
    },
    { 
        title: "Highway Construction Project",
        des: "New highway in South Africa",
        author: "Oliver Martin",
        client: 11, 
        country: "South Africa", 
        biddingEntity: "RoadBuild",
        technicalUnit: "Transport", 
        consortiumRole: "Technical Advisor",
        metrics: 11, 
    },
    { 
        title: "Flood Defense System",
        des: "Flood prevention in Dhaka",
        author: "Amelia Lewis",
        client: 12, 
        country: "Bangladesh", 
        biddingEntity: "FloodGuard",
        technicalUnit: "Environmental Engineering", 
        consortiumRole: "Consultant",
        metrics:  12,
    },
    { 
        title: "Urban Park Development",
        des: "Creating green spaces in Manila",
        author: "Noah Walker",
        client: 13, 
        country: "Philippines", 
        biddingEntity: "EcoSpaces",
        technicalUnit: "Environmental Planning", 
        consortiumRole: "Lead",
        metrics:  13,
    },
    { 
        title: "Waste Management System",
        des: "Improving waste handling in Jakarta",
        author: "Sophia Hall",
        client: 14, 
        country: "Indonesia", 
        biddingEntity: "CleanCity",
        technicalUnit: "Waste Management", 
        consortiumRole: "Technical Advisor",
        metrics: 14,
    },
    { 
        title: "Tourism Infrastructure Enhancement",
        des: "Tourist facility upgrades in Thailand",
        author: "Liam Young",
        client: 15, 
        country: "Thailand", 
        biddingEntity: "TourismBuild",
        technicalUnit: "Hospitality", 
        consortiumRole: "Partner",
        metrics: 15,
    },
    { 
        title: "Public Safety Network",
        des: "Safety network development in Rio",
        author: "Charlotte Turner",
        client: 16, 
        country: "Brazil", 
        biddingEntity: "SafeCity",
        technicalUnit: "Public Safety", 
        consortiumRole: "Lead",
        metrics: 16,
    },
    { 
        title: "Industrial Zone Expansion",
        des: "Industrial park expansion in Poland",
        author: "Ethan King",
        client: 17, 
        country: "Poland", 
        biddingEntity: "IndustExpand",
        technicalUnit: "Industrial Planning", 
        consortiumRole: "Consultant",
        metrics: 17, 
    },
    { 
        title: "Seaport Modernization",
        des: "Modernizing seaport facilities in Vietnam",
        author: "Ava Wright",
        client: 18, 
        country: "Vietnam", 
        biddingEntity: "PortModern",
        technicalUnit: "Maritime", 
        consortiumRole: "Lead",
        metrics: 18, 
    },
    { 
        title: "Airport Upgrade Project",
        des: "Airport capacity enhancement in Dubai",
        author: "William Scott",
        client: 19, 
        country: "UAE", 
        biddingEntity: "SkyBuild",
        technicalUnit: "Aviation", 
        consortiumRole: "Technical Advisor",
        metrics: 19, 
    },
    { 
        title: "Urban Transit System",
        des: "New urban transit lines in Toronto",
        author: "Mia Hill",
        client: 20, 
        country: "Canada", 
        biddingEntity: "TransitPlus",
        technicalUnit: "Public Transport", 
        consortiumRole: "Lead",
        metrics: 20,
    }
];

// Seed data for the 'clients' table
const clientsSeed = [
    {
        name: "Global Infra Ltd",
        des: "An international infrastructure development company."
    },
    {
        name: "EnergySolutions",
        des: "Focuses on renewable energy projects across Africa."
    },
    {
        name: "EduBuild Consortium",
        des: "Specializes in educational infrastructure in West Africa."
    },
    {
        name: "WaterWorks",
        des: "Provides water management and infrastructure services."
    },
    {
        name: "ConstructCo",
        des: "A leading construction company in North Africa."
    },
    {
        name: "HealthPlus Ventures",
        des: "Healthcare project development firm in East Africa."
    },
    {
        name: "SolarTech",
        des: "Develops solar energy solutions in North and Sub-Saharan Africa."
    },
    {
        name: "UrbanTech",
        des: "Urban planning and smart city solutions provider in Nigeria."
    },
    {
        name: "AgriModernize",
        des: "Agricultural development and modernization firm."
    },
    {
        name: "Telecom Expand",
        des: "Telecommunication infrastructure provider in North Africa."
    },
    {
        name: "RoadBuild",
        des: "Specializes in road and transport infrastructure in Southern Africa."
    },
    {
        name: "FloodGuard",
        des: "Environmental engineering firm focusing on flood prevention."
    },
    {
        name: "EcoSpaces",
        des: "Designs and implements sustainable urban green spaces."
    },
    {
        name: "CleanCity",
        des: "Waste management and recycling company in Southeast Asia."
    },
    {
        name: "TourismBuild",
        des: "Infrastructure development for the tourism sector."
    },
    {
        name: "SafeCity",
        des: "Public safety and security infrastructure development."
    },
    {
        name: "IndustExpand",
        des: "Industrial planning and development in Europe."
    },
    {
        name: "PortModern",
        des: "Seaport modernization and management company in Southeast Asia."
    },
    {
        name: "SkyBuild",
        des: "Specializes in aviation and airport infrastructure projects."
    },
    {
        name: "TransitPlus",
        des: "Public transportation systems developer in North America." }
];

async function seed() {
    // seeding clients table.
    await db.insert(clientsTable).values(clientsSeed)

    // seeding bids table
    await db.insert(bidsTable).values(bidsSeed)
}

seed()
