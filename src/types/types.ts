// General bid data type
export interface BidDataType {
  title: string; // Title of the bid
  id: number; // Title of the bid
  phase: string; // Current phase of the bid
  date: string; // Date of the bid
  author: string; // Author of the bid
  client: string; // Client name
  country: string; // Country of operation
  biddingEntity: string; // The entity placing the bid
  technicalUnit: string; // Technical unit responsible
  consortiumRole: string; // Role in the consortium
  deadline: string; // Submission deadline
  des: string; // Submission deadline
  go_capture: boolean;
  go_eoi: boolean;
  go_tender: boolean;
  tent_capture: boolean;
  tent_eoi: boolean;
  tent_tender: boolean;
  urgent: boolean;

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

export type BidTypeArray = BidType[];

export interface DataTabProps {
  open: boolean;
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
  entry: BidType | null;
  detailedView: boolean;
}

// Backend bid type
export interface BackendBidType {
  title: string;
  id: number;
  des: string;
  phase: string;
  date: string;
  author: string;
  client: string;
  country: string;
  biddingEntity: string;
  technicalUnit: string;
  consortiumRole: string;
  deadline: string;
  competence: number;
  country_experience: number;
  clients: number;
  number_of_bidders: number;
  competitor_profile: number;
  partner_capacity: number;
  client_preference: number;
  client_intelligence: number;
  client_procurement: number;
  availability_of_resources: number;
  contract_value: number;
  expert_loe: number;
  project_duration: number;
  bd_input: number;
  historical_net_margin: number;
  future_revenue: number;
  scope_of_work: number;
  ease_of_doing_business: number;
  security: number;
  reputational_risk: number;
  go_capture: boolean;
  go_eoi: boolean;
  go_tender: boolean;
  tent_capture: boolean;
  tent_eoi: boolean;
  tent_tender: boolean;
  urgent: boolean;
}

export interface AggregatedBid {
  title: string;
  id: number;
  des: string;
}

export type AggregatedBidArrayType = AggregatedBid[]

export interface CommercialsTabType {
  budget: number;
  duration: number;
  bid_director_capture: number;
  bid_director_eoi: number;
  bid_director_tender: number;
  bid_manager_capture: number;
  bid_manager_eoi: number;
  bid_manager_tender: number;
  technical_lead_capture: number;
  technical_lead_eoi: number;
  technical_lead_tender: number;
  rec_lead_capture: number;
  rec_lead_eoi: number;
  rec_lead_tender: number;
  proposal_write_capture: number;
  proposal_write_eoi: number;
  proposal_write_tender: number;
  analyst_capture: number;
  analyst_eoi: number;
  analyst_tender: number;
  reviewer_capture: number;
  reviewer_eoi: number;
  reviewer_tender: number;
  copy_writer_capture: number;
  copy_writer_eoi: number;
  copy_writer_tender: number;
  recruiter_admin_capture: number;
  recruiter_admin_eoi: number;
  recruiter_admin_tender: number;
  comm_lead_capture: number;
  comm_lead_eoi: number;
  comm_lead_tender: number;
  pm_capture: number;
  pm_eoi: number;
  pm_tender: number;
  graphic_des_capture: number;
  graphic_des_eoi: number;
  graphic_des_tender: number;
  translator_capture: number;
  translator_eoi: number;
  translator_tender: number;
}