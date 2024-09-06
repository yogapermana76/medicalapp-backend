import { PrismaClient } from '@prisma/client';
import { medicines } from './data-seeder';

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.$transaction([
      prisma.medicine.createMany({ data: medicines }),
    ]);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
