import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

config({ path: '.env.local' }); // or .env.local
const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString, { prepare: false });

// using the recommended settings from supabase.
export const db = drizzle({ client });
