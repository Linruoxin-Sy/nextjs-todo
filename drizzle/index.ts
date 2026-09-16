import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';

export const db = drizzle(process.env.DATABASE_URL!);
