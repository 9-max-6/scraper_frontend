CREATE TYPE "public"."phases" AS ENUM('capture', 'eoi', 'tender');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('undec', 'go_cap', 'tent_eoi', 'tent_cap', 'go_eoi', 'go_tender', 'tent_tender');--> statement-breakpoint
CREATE TYPE "public"."clients" AS ENUM('0', '1', '2', '3', '4');--> statement-breakpoint
CREATE TYPE "public"."competence" AS ENUM('0', '1', '2', '3', '4');--> statement-breakpoint
CREATE TYPE "public"."countryExperience" AS ENUM('0', '1', '2', '3', '4');--> statement-breakpoint
CREATE TYPE "public"."bdInput" AS ENUM('0', '1', '2', '3', '4', '5');--> statement-breakpoint
CREATE TYPE "public"."contractValue" AS ENUM('0', '1', '2', '3', '4', '5');--> statement-breakpoint
CREATE TYPE "public"."expertLoe" AS ENUM('0', '1', '2', '3', '4', '5');--> statement-breakpoint
CREATE TYPE "public"."futureRevenue" AS ENUM('0', '3', '5');--> statement-breakpoint
CREATE TYPE "public"."historicalNetMargin" AS ENUM('0', '1', '2', '3', '4', '5');--> statement-breakpoint
CREATE TYPE "public"."projectDuration" AS ENUM('0', '1', '2', '3', '4', '5');--> statement-breakpoint
CREATE TYPE "public"."availabilityOfResources" AS ENUM('0', '2', '4');--> statement-breakpoint
CREATE TYPE "public"."clientIntelligence" AS ENUM('0', '1', '2', '3', '4');--> statement-breakpoint
CREATE TYPE "public"."clientPreference" AS ENUM('0', '1', '3', '4');--> statement-breakpoint
CREATE TYPE "public"."clientProcurement" AS ENUM('0', '1', '2', '4');--> statement-breakpoint
CREATE TYPE "public"."competitorProfile" AS ENUM('0', '2', '4');--> statement-breakpoint
CREATE TYPE "public"."numberOfBidders" AS ENUM('0', '1', '2', '3', '4');--> statement-breakpoint
CREATE TYPE "public"."partnerCapacity" AS ENUM('0', '1', '2', '3', '4');--> statement-breakpoint
CREATE TYPE "public"."easeOfDoingBusiness" AS ENUM('0', '1', '2', '3');--> statement-breakpoint
CREATE TYPE "public"."reputationalRisk" AS ENUM('0', '1', '3');--> statement-breakpoint
CREATE TYPE "public"."scopeOfWork" AS ENUM('0', '2', '3');--> statement-breakpoint
CREATE TYPE "public"."security" AS ENUM('0', '1', '2', '3');--> statement-breakpoint
CREATE TABLE "bids" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"des" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp,
	"updatedAt" timestamp,
	"deadline" timestamp,
	"phase" "phases" DEFAULT 'capture',
	"author" varchar(50) NOT NULL,
	"client" integer NOT NULL,
	"country" varchar(50) NOT NULL,
	"biddingEntity" varchar(50) NOT NULL,
	"technicalUnit" varchar(50) NOT NULL,
	"consortiumRole" varchar(50) NOT NULL,
	"urgent" boolean DEFAULT false NOT NULL,
	"budget" bigint DEFAULT 0 NOT NULL,
	"duration" integer DEFAULT 0 NOT NULL,
	"status" "status" DEFAULT 'undec',
	"metrics" integer
);
--> statement-breakpoint
CREATE TABLE "capabilities" (
	"id" serial PRIMARY KEY NOT NULL,
	"competence" "competence" DEFAULT '0',
	"countryExperience" "countryExperience" DEFAULT '0',
	"clients" "clients" DEFAULT '0'
);
--> statement-breakpoint
CREATE TABLE "bdinput" (
	"id" serial PRIMARY KEY NOT NULL,
	"bidDirectorCapture" integer DEFAULT 0 NOT NULL,
	"bidDirectorEoi" integer DEFAULT 0 NOT NULL,
	"bidDirectorTender" integer DEFAULT 0 NOT NULL,
	"bidManagerCapture" integer DEFAULT 0 NOT NULL,
	"bidManagerEoi" integer DEFAULT 0 NOT NULL,
	"bidManagerTender" integer DEFAULT 0 NOT NULL,
	"technicalLeadCapture" integer DEFAULT 0 NOT NULL,
	"technicalLeadEoi" integer DEFAULT 0 NOT NULL,
	"technicalLeadTender" integer DEFAULT 0 NOT NULL,
	"recLeadCapture" integer DEFAULT 0 NOT NULL,
	"recLeadEoi" integer DEFAULT 0 NOT NULL,
	"recLeadTender" integer DEFAULT 0 NOT NULL,
	"proposalWriteCapture" integer DEFAULT 0 NOT NULL,
	"proposalWriteEoi" integer DEFAULT 0 NOT NULL,
	"proposalWriteTender" integer DEFAULT 0 NOT NULL,
	"analystCapture" integer DEFAULT 0 NOT NULL,
	"analystEoi" integer DEFAULT 0 NOT NULL,
	"analystTender" integer DEFAULT 0 NOT NULL,
	"reviewerCapture" integer DEFAULT 0 NOT NULL,
	"reviewerEoi" integer DEFAULT 0 NOT NULL,
	"reviewerTender" integer DEFAULT 0 NOT NULL,
	"copyWriterCapture" integer DEFAULT 0 NOT NULL,
	"copyWriterEoi" integer DEFAULT 0 NOT NULL,
	"copyWriterTender" integer DEFAULT 0 NOT NULL,
	"recruiterAdminCapture" integer DEFAULT 0 NOT NULL,
	"recruiterAdminEoi" integer DEFAULT 0 NOT NULL,
	"recruiterAdminTender" integer DEFAULT 0 NOT NULL,
	"commLeadCapture" integer DEFAULT 0 NOT NULL,
	"commLeadEoi" integer DEFAULT 0 NOT NULL,
	"commLeadTender" integer DEFAULT 0 NOT NULL,
	"pmCapture" integer DEFAULT 0 NOT NULL,
	"pmEoi" integer DEFAULT 0 NOT NULL,
	"pmTender" integer DEFAULT 0 NOT NULL,
	"graphicDesCapture" integer DEFAULT 0 NOT NULL,
	"graphicDesEoi" integer DEFAULT 0 NOT NULL,
	"graphicDesTender" integer DEFAULT 0 NOT NULL,
	"translatorCapture" integer DEFAULT 0 NOT NULL,
	"translatorEoi" integer DEFAULT 0 NOT NULL,
	"translatorTender" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "commercials" (
	"id" serial PRIMARY KEY NOT NULL,
	"contractValue" "contractValue" DEFAULT '0',
	"expertLoe" "expertLoe" DEFAULT '0',
	"projectDuration" "projectDuration" DEFAULT '0',
	"bdInput" "bdInput" DEFAULT '0',
	"historicalNetMargin" "historicalNetMargin" DEFAULT '0',
	"futureRevenue" "futureRevenue" DEFAULT '0',
	"bdInputId" integer
);
--> statement-breakpoint
CREATE TABLE "competitiveness" (
	"id" serial PRIMARY KEY NOT NULL,
	"numberOfBidders" "numberOfBidders" DEFAULT '0',
	"competitorProfile" "competitorProfile" DEFAULT '0',
	"partnerCapacity" "partnerCapacity" DEFAULT '0',
	"clientPreference" "clientPreference" DEFAULT '0',
	"clientIntelligence" "clientIntelligence" DEFAULT '0',
	"clientProcurement" "clientProcurement" DEFAULT '0',
	"availabilityOfResources" "availabilityOfResources" DEFAULT '0'
);
--> statement-breakpoint
CREATE TABLE "clientsTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"des" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "metrics" (
	"id" serial PRIMARY KEY NOT NULL,
	"riskId" integer,
	"competitivenessId" integer,
	"capabilitiesId" integer,
	"commercialsId" integer,
	CONSTRAINT "metrics_riskId_unique" UNIQUE("riskId"),
	CONSTRAINT "metrics_competitivenessId_unique" UNIQUE("competitivenessId"),
	CONSTRAINT "metrics_capabilitiesId_unique" UNIQUE("capabilitiesId"),
	CONSTRAINT "metrics_commercialsId_unique" UNIQUE("commercialsId")
);
--> statement-breakpoint
CREATE TABLE "risk" (
	"id" serial PRIMARY KEY NOT NULL,
	"scopeOfWork" "scopeOfWork" DEFAULT '0',
	"easeOfDoingBusiness" "easeOfDoingBusiness" DEFAULT '0',
	"security" "security" DEFAULT '0',
	"reputationalRisk" "reputationalRisk" DEFAULT '0'
);
--> statement-breakpoint
CREATE TABLE "scores" (
	"id" serial PRIMARY KEY NOT NULL,
	"bid" serial NOT NULL,
	"overallScore" integer DEFAULT 0 NOT NULL,
	"capabilitiesScore" integer DEFAULT 0 NOT NULL,
	"competitivenessScore" integer DEFAULT 0 NOT NULL,
	"commercialsScore" integer DEFAULT 0 NOT NULL,
	"riskScore" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bids" ADD CONSTRAINT "bids_client_clientsTable_id_fk" FOREIGN KEY ("client") REFERENCES "public"."clientsTable"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bids" ADD CONSTRAINT "bids_metrics_metrics_id_fk" FOREIGN KEY ("metrics") REFERENCES "public"."metrics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commercials" ADD CONSTRAINT "commercials_bdInputId_bdinput_id_fk" FOREIGN KEY ("bdInputId") REFERENCES "public"."bdinput"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "metrics" ADD CONSTRAINT "metrics_riskId_risk_id_fk" FOREIGN KEY ("riskId") REFERENCES "public"."risk"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "metrics" ADD CONSTRAINT "metrics_competitivenessId_competitiveness_id_fk" FOREIGN KEY ("competitivenessId") REFERENCES "public"."competitiveness"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "metrics" ADD CONSTRAINT "metrics_capabilitiesId_capabilities_id_fk" FOREIGN KEY ("capabilitiesId") REFERENCES "public"."capabilities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "metrics" ADD CONSTRAINT "metrics_commercialsId_commercials_id_fk" FOREIGN KEY ("commercialsId") REFERENCES "public"."commercials"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scores" ADD CONSTRAINT "scores_bid_bids_id_fk" FOREIGN KEY ("bid") REFERENCES "public"."bids"("id") ON DELETE no action ON UPDATE no action;