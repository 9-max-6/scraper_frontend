// General bid data type
export interface BidDataType {
    title: string; // Title of the bid
    phase: string; // Current phase of the bid
    date: string; // Date of the bid
    author: string; // Author of the bid
    client: string; // Client name
    country: string; // Country of operation
    biddingEntity: string; // The entity placing the bid
    technicalUnit: string; // Technical unit responsible
    consortiumRole: string; // Role in the consortium
    deadline: string; // Submission deadline
  }
  
  // Capabilities metrics type
  export interface CapabilitiesType {
    competence: number; // A measure of competence
    country: number; // Regional experience rating
    clients: number; // Number of clients
  }
  
  // Competitiveness metrics type
  export interface CompetitivenessType {
    number: number; // Number of bidders
    competitor: number; // Profile of competitors
    partner: number; // Capacity of partners
    preference: number; // Client preferences
    intelligence: number; // Client intelligence level
    procurement: number; // Client's procurement process rating
    availability: number; // Availability of resources
  }
  
  // Commercial metrics type
  export interface CommercialsType {
    contract: number; // Value of the contract
    expert: number; // Level of effort required by experts
    project: number; // Duration of the project (e.g., in months)
    bd: number; // Business development input
    historicals: number; // Historical net margin
    future: number; // Potential future revenue
  }
  
  // Risk metrics type
  export interface RiskType {
    scope: number; // Scope of work complexity
    ease: number; // Ease of implementation
    security: number; // Security risk level
    reputational: number; // Reputational risk
  }
  
  // Combined bid object type
  export interface BidType {
    bidData: BidDataType; // General bid details
    metrics: {
      capabilities: CapabilitiesType; // Capabilities metrics
      competitiveness: CompetitivenessType; // Competitiveness metrics
      commercials: CommercialsType; // Commercial metrics
      risk: RiskType; // Risk metrics
    };
  }
  