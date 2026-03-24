import {z} from "zod"
import dotenv from "dotenv";
import path from "path";

// Which file to load first
const nodeEnv = process.env.NODE_ENV || 'development';
const envFile = nodeEnv === 'production'
? '.env.production'
: nodeEnv === 'test'
    ? '.env.test'
    : '.env.development';

// Load file
dotenv.config({path: path.resolve(process.cwd(),envFile)});

const envSchema = z.object({
    PORT: z.preprocess((input) => {
        if(typeof input === "string" && input.trim() === "") return undefined;
        return Number(input);
    }, z.number().default(3001)),
    DATABASE_URL: z.url(),
    EMAIL: z.email(),
    EMAIL_PASSWORD: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development")
});

export const env = envSchema.parse(process.env);