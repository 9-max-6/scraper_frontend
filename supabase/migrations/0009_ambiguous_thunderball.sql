ALTER TABLE "bids" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "bids" ALTER COLUMN "updatedAt" SET NOT NULL;