ALTER TABLE "bids" ALTER COLUMN "client" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "competence" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "countryExperience" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "clients" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "numberOfBidders" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "competitorProfile" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "partnerCapacity" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "clientPreference" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "clientIntelligence" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "clientProcurement" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "availabilityOfResources" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "contractValue" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "expertLoe" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "projectDuration" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "bdInput" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "historicalNetMargin" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "futureRevenue" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "scopeOfWork" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "easeOfDoingBusiness" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "security" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "reputationalRisk" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "goCapture" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "goEoi" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "goTender" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "tentCapture" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "tentEoi" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "tentTender" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "urgent" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "budget" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "budget" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "duration" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "duration" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "bidDirectorCapture" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "bidDirectorCapture" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "bidDirectorEoi" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "bidDirectorEoi" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "bidDirectorTender" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "bidDirectorTender" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "bidManagerCapture" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "bidManagerCapture" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "bidManagerEoi" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "bidManagerEoi" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "bidManagerTender" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "bidManagerTender" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "technicalLeadCapture" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "technicalLeadCapture" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "technicalLeadEoi" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "technicalLeadEoi" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "technicalLeadTender" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "technicalLeadTender" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "recLeadCapture" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "recLeadCapture" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "recLeadEoi" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "recLeadEoi" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "recLeadTender" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "recLeadTender" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "proposalWriteCapture" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "proposalWriteCapture" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "proposalWriteEoi" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "proposalWriteEoi" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "proposalWriteTender" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "proposalWriteTender" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "analystCapture" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "analystCapture" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "analystEoi" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "analystEoi" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "analystTender" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "analystTender" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "reviewerCapture" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "reviewerCapture" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "reviewerEoi" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "reviewerEoi" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "reviewerTender" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "reviewerTender" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "copyWriterCapture" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "copyWriterCapture" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "copyWriterEoi" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "copyWriterEoi" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "copyWriterTender" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "copyWriterTender" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "recruiterAdminCapture" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "recruiterAdminCapture" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "recruiterAdminEoi" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "recruiterAdminEoi" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "recruiterAdminTender" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "recruiterAdminTender" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "commLeadCapture" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "commLeadCapture" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "commLeadEoi" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "commLeadEoi" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "commLeadTender" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "commLeadTender" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "pmCapture" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "pmCapture" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "pmEoi" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "pmEoi" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "pmTender" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "pmTender" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "graphicDesCapture" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "graphicDesCapture" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "graphicDesEoi" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "graphicDesEoi" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "graphicDesTender" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "graphicDesTender" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "translatorCapture" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "translatorCapture" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "translatorEoi" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "translatorEoi" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "translatorTender" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "translatorTender" SET DEFAULT 0;