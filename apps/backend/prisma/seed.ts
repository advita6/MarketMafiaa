import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.mailBox.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.competition.deleteMany();
  await prisma.user.deleteMany();
  const org1 = await prisma.user.create({ data: { name: 'Org One', email: 'org1@example.com', password: '$2b$10$invalidhashinvalidhashin', role: 'organizer' } });
  const org2 = await prisma.user.create({ data: { name: 'Org Two', email: 'org2@example.com', password: '$2b$10$invalidhashinvalidhashin', role: 'organizer' } });
  for (let i = 1; i <= 5; i++) {
    await prisma.user.create({ data: { name: `User ${i}`, email: `user${i}@example.com`, password: '$2b$10$invalidhashinvalidhashin', role: 'participant' } });
  }
  const now = new Date();
  for (let i = 1; i <= 5; i++) {
    await prisma.competition.create({
      data: {
        title: `Competition ${i}`,
        description: `Description for comp ${i}`,
        tags: ['coding','fun'],
        capacity: 5 + i,
        regDeadline: new Date(now.getTime() + 1000 * 60 * 60 * 24 * (i + 1)),
        organizerId: i % 2 === 0 ? org2.id : org1.id
      }
    });
  }
}
main().catch((e)=>{console.error(e);process.exit(1);}).finally(async ()=>{await prisma.$disconnect();});
