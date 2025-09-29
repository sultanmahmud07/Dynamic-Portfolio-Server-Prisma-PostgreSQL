import dotenv from "dotenv";

dotenv.config()

interface EnvConfig {
    PORT: string,
    DATABASE_URL: string,
    NODE_ENV: "development" | "production"
    SEED_EMAIL: string
    SEED_PASSWORD: string
    JWT_ACCESS_SECRET: string
    JWT_ACCESS_EXPIRES: string
    JWT_REFRESH_SECRET: string
    JWT_REFRESH_EXPIRES: string
    BCRYPT_SALT_ROUND: string
    EXPRESS_SESSION_SECRET: string
    FRONTEND_URL: string

}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ["PORT", "DATABASE_URL", "NODE_ENV", "BCRYPT_SALT_ROUND", "JWT_ACCESS_EXPIRES", "JWT_ACCESS_SECRET", "SEED_EMAIL", "SEED_PASSWORD", "JWT_REFRESH_SECRET", "JWT_REFRESH_EXPIRES", "EXPRESS_SESSION_SECRET", "FRONTEND_URL"];

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variabl ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        DATABASE_URL: process.env.DATABASE_URL!,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
        SEED_EMAIL: process.env.SEED_EMAIL as string,
        SEED_PASSWORD: process.env.SEED_PASSWORD as string,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string

    }
}

export const envVars = loadEnvVariables()