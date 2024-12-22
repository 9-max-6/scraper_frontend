ALTER TABLE "capabilities" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "capabilities" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "commercials" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "commercials" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "competitiveness" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "competitiveness" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "risk" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "risk" ADD COLUMN "updatedAt" timestamp;