import { prisma } from '../config/db';

export class FieldService {
  static async getAll(userId: string, role: string) {
    if (role === 'ADMIN') {
      return prisma.field.findMany({ include: { agent: true, updates: { orderBy: { createdAt: 'desc' }, take: 1 } } });
    }
    return prisma.field.findMany({
      where: { assignedAgentId: userId },
      include: { agent: true, updates: { orderBy: { createdAt: 'desc' }, take: 1 } }
    });
  }

  static async getById(id: string, userId: string, role: string) {
    const field = await prisma.field.findUnique({
      where: { id },
      include: { updates: { orderBy: { createdAt: 'desc' } }, agent: true }
    });
    
    if (!field) throw new Error('Field not found');
    
    if (role !== 'ADMIN' && field.assignedAgentId !== userId) {
      throw new Error('Forbidden');
    }
    
    return field;
  }

  static async create(data: any) {
    return prisma.field.create({ data });
  }

  static async update(id: string, data: any) {
    if (data.plantingDate) data.plantingDate = new Date(data.plantingDate);
    return prisma.field.update({ where: { id }, data });
  }

  static async assignAgent(id: string, agentId: string) {
    const user = await prisma.user.findUnique({ where: { id: agentId } });
    if (!user || user.role !== 'AGENT') {
      throw new Error('Invalid agent ID');
    }
    return prisma.field.update({
      where: { id },
      data: { assignedAgentId: agentId },
    });
  }
}
