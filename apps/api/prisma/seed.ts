/// <reference types="node" />
import { PrismaClient, Role, FieldStage } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.fieldUpdate.deleteMany();
  await prisma.field.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      name: 'System Admin',
      email: 'admin@demo.com',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  // Create Agents
  const agentPassword = await bcrypt.hash('agent123', 10);
  const agent1 = await prisma.user.create({
    data: {
      name: 'Agent One',
      email: 'agent1@demo.com',
      password: agentPassword,
      role: Role.AGENT,
    },
  });

  const agent2 = await prisma.user.create({
    data: {
      name: 'Agent Two',
      email: 'agent2@demo.com',
      password: agentPassword,
      role: Role.AGENT,
    },
  });

  // Create Fields
  const field1 = await prisma.field.create({
    data: {
      name: 'North Valley Plot',
      cropType: 'Maize',
      plantingDate: new Date('2024-03-01'),
      stage: FieldStage.PLANTED,
      assignedAgentId: agent1.id,
    },
  });

  const field2 = await prisma.field.create({
    data: {
      name: 'East Ridge Farm',
      cropType: 'Wheat',
      plantingDate: new Date('2024-02-15'),
      stage: FieldStage.GROWING,
      assignedAgentId: agent2.id,
    },
  });

  const field3 = await prisma.field.create({
    data: {
      name: 'South Basin Field',
      cropType: 'Rice',
      plantingDate: new Date('2023-11-20'),
      stage: FieldStage.HARVESTED,
      assignedAgentId: agent1.id,
    },
  });

  // Create Updates
  await prisma.fieldUpdate.create({
    data: {
      note: 'Initial planting complete. Soil moisture is adequate.',
      stage: FieldStage.PLANTED,
      fieldId: field1.id,
      agentId: agent1.id,
      createdAt: new Date('2024-03-02'),
    },
  });

  await prisma.fieldUpdate.create({
    data: {
      note: 'Propagating well. Applying standard nitrogen fertilizer.',
      stage: FieldStage.GROWING,
      fieldId: field2.id,
      agentId: agent2.id,
      createdAt: new Date('2024-03-10'),
    },
  });

  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
