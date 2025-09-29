import bcrypt from "bcrypt";
import { prisma } from "../config/db";
import { envVars } from "../config/env";

export const seedOwner = async () => {
  try {
    const existingOwner = await prisma.user.findUnique({
      where: { email: envVars.SEED_EMAIL || "owner@gmail.com" },
    });

    if (existingOwner) {
      console.log("😊 Owner already exists!");
      return;
    }

    console.log("⚡ Trying to create Owner...");

    const hashedPassword = await bcrypt.hash(
      envVars.SEED_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    const payload = {
      name: "Owner",
      role: "OWNER" as const,
      email: envVars.SEED_EMAIL || "owner@gmail.com",
      password: hashedPassword,
    };

    const owner = await prisma.user.create({ data: payload });
    console.log("✅ Owner created successfully!");
    console.log(owner);
  } catch (error) {
    console.log("❌ Error seeding owner:", error);
  }
};
