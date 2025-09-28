import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = process.env.SEED_PASSWORD || "W@123456";
  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email: process.env.SEED_EMAIL || "owner@gmail.com" },
    update: {},
    create: {
      name: "Portfolio Owner",
      email: process.env.SEED_EMAIL || "owner@gmail.com",
      password: hashed,
      role: "OWNER"
    }
  });

  console.log("✅ Seeded owner user");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
